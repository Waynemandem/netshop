import { useState, useEffect } from 'react'
import { supabase } from './lib/supabaseClient'
import { useCart } from './useCart'

function ProductGrid({ searchTerm, filter, onSelectProduct }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { addToCart } = useCart()

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from('products').select('*')
      if (error) {
        setError(error.message)
      } else {
        setProducts(data)
      }
      setLoading(false)
    }
    fetchProducts()
  }, [])

  if (loading) {
    return <div className="status-message min-h-[40vh] flex items-center justify-center text-sm">loading</div>
  }

  if (error) {
    return <div className="status-message status-error min-h-[40vh] flex items-center justify-center text-sm">{error}</div>
  }

  let visible = products
  if (filter === 'trending') visible = visible.filter((p) => p.is_trending)
  if (searchTerm.trim()) {
    visible = visible.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
    )
  }

  if (visible.length === 0) {
    return (
      <div className="empty-state glass-panel max-w-5xl mx-auto px-6 py-16 text-center text-sm">
        Nothing matches — try a different search.
      </div>
    )
  }

  const hasSearch = searchTerm.trim()
  const trending = visible.filter((p) => p.is_trending)

  function ProductCard({ product, compact = false }) {
    return (
      <article className={`product-card glass-panel ${compact ? 'product-card-compact' : ''}`}>
        <button
          type="button"
          onClick={() => onSelectProduct(product)}
          className="product-image-button"
          aria-label={`View ${product.name}`}
        >
          <img
            src={product.images}
            alt={product.name}
            className="product-image"
          />
          {product.is_trending && (
            <span className="trend-badge">
              Trending
            </span>
          )}
        </button>

        <div className="product-card-body">
          <button
            type="button"
            onClick={() => onSelectProduct(product)}
            className="product-name"
          >
            {product.name}
          </button>
          <div className="product-meta">
            <p className="product-price">
              ₦{Number(product.price).toLocaleString()}
            </p>
            <button
              type="button"
              onClick={() => addToCart(product)}
              className="add-button"
            >
              Add
            </button>
          </div>
        </div>
      </article>
    )
  }

  return (
    <main className="catalog max-w-5xl mx-auto px-6 pb-20">
      {filter !== 'trending' && trending.length > 0 && (
        <section className="catalog-section trending-section" aria-labelledby="trending-heading">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Live picks</p>
              <h1 id="trending-heading">Trending Now</h1>
            </div>
            <span className="section-pill">Hot</span>
          </div>
          <div className="trending-row">
            {trending.map((product) => (
              <ProductCard key={product.id} product={product} compact />
            ))}
          </div>
        </section>
      )}

      <section className="catalog-section" aria-labelledby="products-heading">
        <div className="section-heading">
          <div>
            <p className="section-kicker">{hasSearch ? 'Search results' : filter === 'trending' ? 'Filtered' : 'Shop'}</p>
            <h2 id="products-heading">{filter === 'trending' ? 'Trending Products' : 'All Products'}</h2>
          </div>
          <span className="product-count">{visible.length} items</span>
        </div>
        <div className="product-grid">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  )
}

export default ProductGrid
