-- Production hardening for Netshop catalog and checkout.

create index if not exists idx_orders_created_at_order_status
  on public.orders (created_at desc, order_status);

create index if not exists idx_products_is_trending_category
  on public.products (is_trending, category);

alter table public.products enable row level security;
alter table public.orders enable row level security;

grant select on table public.products to anon, authenticated;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'products'
      and policyname = 'Public products are readable'
  ) then
    create policy "Public products are readable"
      on public.products
      for select
      to anon, authenticated
      using (true);
  end if;
end $$;

do $$
declare
  policy_record record;
begin
  for policy_record in
    select policyname
    from pg_policies
    where schemaname = 'public'
      and tablename = 'orders'
      and cmd = 'SELECT'
  loop
    execute format('drop policy if exists %I on public.orders', policy_record.policyname);
  end loop;
end $$;

revoke select, insert, update, delete on table public.orders from public, anon, authenticated;

create or replace function public.validate_order_insert()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  item jsonb;
  normalized_items jsonb := '[]'::jsonb;
  submitted_items jsonb := coalesce(new.items, '[]'::jsonb);
  product_id text;
  product_name text;
  product_price numeric;
  requested_qty integer;
  stock_available integer;
  stock_column text;
  normalized_phone text;
  rate_limit_count integer;
  line_total numeric;
  order_total numeric := 0;
begin
  new.customer_name := btrim(coalesce(new.customer_name, ''));
  new.customer_phone := btrim(coalesce(new.customer_phone, ''));
  new.delivery_address := btrim(coalesce(new.delivery_address, ''));
  new.delivery_zone := btrim(coalesce(new.delivery_zone, ''));
  new.payment_method := btrim(coalesce(new.payment_method, ''));

  if length(new.customer_name) < 2 or length(new.customer_name) > 120 then
    raise exception 'invalid_customer_name';
  end if;

  normalized_phone := regexp_replace(new.customer_phone, '\D', '', 'g');
  if length(normalized_phone) < 10 or length(normalized_phone) > 15 then
    raise exception 'invalid_customer_phone';
  end if;

  if length(new.delivery_address) < 10 or length(new.delivery_address) > 500 then
    raise exception 'invalid_delivery_address';
  end if;

  if new.delivery_zone not in ('lagos_same_day', 'lagos_next_day', 'ogun') then
    raise exception 'invalid_delivery_zone';
  end if;

  if new.payment_method not in ('transfer', 'cod') then
    raise exception 'invalid_payment_method';
  end if;

  if jsonb_typeof(submitted_items) <> 'array' then
    raise exception 'invalid_items';
  end if;

  if jsonb_array_length(submitted_items) < 1
    or jsonb_array_length(submitted_items) > 25 then
    raise exception 'invalid_items';
  end if;

  select count(*)
    into rate_limit_count
  from public.orders
  where regexp_replace(customer_phone, '\D', '', 'g') = normalized_phone
    and created_at > now() - interval '10 minutes';

  if rate_limit_count >= 3 then
    raise exception 'rate_limited';
  end if;

  select column_name
    into stock_column
  from information_schema.columns
  where table_schema = 'public'
    and table_name = 'products'
    and column_name in ('stock_quantity', 'stock', 'inventory_count')
  order by case column_name
    when 'stock_quantity' then 1
    when 'stock' then 2
    when 'inventory_count' then 3
    else 4
  end
  limit 1;

  if stock_column is null then
    raise exception 'stock_not_configured';
  end if;

  for item in select value from jsonb_array_elements(submitted_items)
  loop
    product_id := nullif(btrim(coalesce(item ->> 'id', '')), '');

    begin
      requested_qty := (item ->> 'qty')::integer;
    exception when others then
      raise exception 'invalid_item_quantity';
    end;

    if product_id is null or requested_qty < 1 or requested_qty > 20 then
      raise exception 'invalid_item';
    end if;

    execute format(
      'select name, price, %I from public.products where id::text = $1 for update',
      stock_column
    )
    into product_name, product_price, stock_available
    using product_id;

    if product_name is null
      or product_price is null
      or product_price < 0
      or stock_available is null then
      raise exception 'invalid_product';
    end if;

    if stock_available < requested_qty then
      raise exception 'insufficient_stock';
    end if;

    execute format(
      'update public.products set %I = %I - $1 where id::text = $2',
      stock_column,
      stock_column
    )
    using requested_qty, product_id;

    line_total := product_price * requested_qty;
    order_total := order_total + line_total;
    normalized_items := normalized_items || jsonb_build_array(
      jsonb_build_object(
        'id', product_id,
        'name', product_name,
        'price', product_price,
        'qty', requested_qty,
        'line_total', line_total
      )
    );
  end loop;

  new.customer_phone := normalized_phone;
  new.items := normalized_items;
  new.total := order_total;

  return new;
end;
$$;

drop trigger if exists trg_validate_order_insert on public.orders;
create trigger trg_validate_order_insert
  before insert on public.orders
  for each row
  execute function public.validate_order_insert();

create or replace function public.submit_order(
  p_customer_name text,
  p_customer_phone text,
  p_delivery_address text,
  p_delivery_zone text,
  p_payment_method text,
  p_items jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  created_order_id public.orders.id%type;
  created_total numeric;
begin
  insert into public.orders (
    customer_name,
    customer_phone,
    delivery_address,
    delivery_zone,
    payment_method,
    items,
    total
  )
  values (
    p_customer_name,
    p_customer_phone,
    p_delivery_address,
    p_delivery_zone,
    p_payment_method,
    p_items,
    0
  )
  returning id, total into created_order_id, created_total;

  return jsonb_build_object(
    'order_id', created_order_id::text,
    'total', created_total
  );
end;
$$;

revoke all on function public.submit_order(text, text, text, text, text, jsonb) from public;
grant execute on function public.submit_order(text, text, text, text, text, jsonb) to anon, authenticated;
