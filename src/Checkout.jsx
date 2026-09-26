import { useState } from 'react'
import { useCart } from './useCart'
import { supabase } from './lib/supabaseClient'

function Checkout({ onClose }) {
  const { cart, total, clearCart, removeFromCart } = useCart()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [zone, setZone] = useState('lagos_same_day')
  const [paymentMethod, setPaymentMethod] = useState('transfer')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [serverTotal, setServerTotal] = useState(null)

  async function handleSubmit(e) {
  e.preventDefault()
  setSubmitting(true)

  const { data, error } = await supabase.rpc('submit_order', {
    p_customer_name: name,
    p_customer_phone: phone,
    p_delivery_address: address,
    p_delivery_zone: zone,
    p_payment_method: paymentMethod,
    p_items: cart.map((item) => ({ id: item.id, qty: item.qty })),
  })

  setSubmitting(false)

  if (error) {
    const friendly = {
      insufficient_stock: "One of your items just sold out — please adjust your cart.",
      rate_limited: "You've placed a few orders recently — please wait a few minutes and try again.",
      invalid_customer_phone: "Please enter a valid phone number.",
      invalid_delivery_address: "Please enter a fuller delivery address.",
      stock_not_configured: "We're having a technical issue — please try again shortly.",
    }
    const code = error.message?.match(/[a-z_]+$/)?.[0]
    alert(friendly[code] || 'Something went wrong: ' + error.message)
  } else {
    setServerTotal(data.total)
    setSuccess(true)
    clearCart()
  }
}
  const labelStyle = { fontFamily: "'Inter', sans-serif" }
  const headingStyle = { fontFamily: "'Fraunces', Georgia, serif" }

  if (success) {
    const whatsappNumber = '2349078740445' // replace with your actual WhatsApp business number, no + or leading 0
    const message = `Hi, I just placed an order on Netshop.
Total: ₦${serverTotal.toLocaleString()}
Payment: ${paymentMethod === 'transfer' ? 'Bank Transfer' : 'Cash on Delivery'}
I'll send payment confirmation here.`

    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

    return (
      <div className="h-full flex flex-col">
        <div className="px-6 pt-6 pb-2 flex items-center justify-between">
          <h2 className="text-[#F5EDE6] text-2xl" style={headingStyle}>Netshop</h2>
          <button onClick={onClose} className="text-[#F5EDE6]/60 text-sm" style={labelStyle}>close</button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <h2 className="text-[#F5EDE6] text-2xl" style={headingStyle}>Order received</h2>
          <p className="text-[#F5EDE6]/60 text-sm mt-3 leading-relaxed" style={labelStyle}>
            {paymentMethod === 'transfer'
              ? 'Send your payment confirmation via WhatsApp to complete your order.'
              : "We'll contact you shortly to confirm delivery."}
          </p>
          {paymentMethod === 'transfer' && (
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 bg-[#B8574E] text-[#F5EDE6] px-5 py-2.5 text-sm hover:opacity-90 transition-opacity"
              style={labelStyle}
            >
              Confirm via WhatsApp
            </a>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <div className="px-6 pt-6 pb-2 flex items-center justify-between">
        <h2 className="text-[#F5EDE6] text-2xl" style={headingStyle}>Your Cart</h2>
        <button onClick={onClose} className="text-[#F5EDE6]/60 text-sm" style={labelStyle}>close</button>
      </div>

      {cart.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-[#F5EDE6]/50 text-sm" style={labelStyle}>
          Your cart is empty.
        </div>
      ) : (
        <div className="px-6 flex-1">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center py-3 border-b border-[#F5EDE6]/10">
              <div>
                <p className="text-[#F5EDE6] text-sm" style={headingStyle}>{item.name}</p>
                <p className="text-xs text-[#F5EDE6]/50 mt-0.5" style={labelStyle}>Qty: {item.qty}</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-[#C9A876] text-sm" style={labelStyle}>
                  ₦{(item.price * item.qty).toLocaleString()}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-xs text-[#B8574E]"
                  style={labelStyle}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <p
            className="text-right text-[#F5EDE6] mt-4"
            style={{ ...labelStyle, fontWeight: 500 }}
          >
            Total: ₦{total.toLocaleString()}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-3 pb-8">
            <input
              required
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent border border-[#F5EDE6]/20 text-[#F5EDE6] placeholder-[#F5EDE6]/40 rounded-none px-3 py-2 text-sm outline-none focus:border-[#C9A876]"
              style={labelStyle}
            />
            <input
              required
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-transparent border border-[#F5EDE6]/20 text-[#F5EDE6] placeholder-[#F5EDE6]/40 px-3 py-2 text-sm outline-none focus:border-[#C9A876]"
              style={labelStyle}
            />
            <textarea
              required
              placeholder="Delivery address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-transparent border border-[#F5EDE6]/20 text-[#F5EDE6] placeholder-[#F5EDE6]/40 px-3 py-2 text-sm outline-none focus:border-[#C9A876]"
              style={labelStyle}
            />
            <select
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              className="w-full bg-[#241419] border border-[#F5EDE6]/20 text-[#F5EDE6] px-3 py-2 text-sm outline-none focus:border-[#C9A876]"
              style={labelStyle}
            >
              <option value="lagos_same_day">Lagos (Mainland/Island) — Same day</option>
              <option value="lagos_next_day">Lagos (Outer) — Next day</option>
              <option value="ogun">Ogun State — Next day</option>
            </select>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full bg-[#241419] border border-[#F5EDE6]/20 text-[#F5EDE6] px-3 py-2 text-sm outline-none focus:border-[#C9A876]"
              style={labelStyle}
            >
              <option value="transfer">Bank Transfer</option>
              <option value="cod">Cash on Delivery</option>
            </select>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#B8574E] text-[#F5EDE6] py-3 text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
              style={labelStyle}
            >
              {submitting ? 'Placing order...' : 'Place Order'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Checkout