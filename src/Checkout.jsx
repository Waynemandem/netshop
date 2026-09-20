import { useState } from 'react'
import { useCart } from './CartContext'
import { supabase } from './lib/supabaseClient'

function Checkout() {
  const { cart, total, clearCart, removeFromCart } = useCart()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [zone, setZone] = useState('lagos_same_day')
  const [paymentMethod, setPaymentMethod] = useState('transfer')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)

    const { error } = await supabase.from('orders').insert({
      customer_name: name,
      customer_phone: phone,
      delivery_address: address,
      delivery_zone: zone,
      items: cart,
      total: total,
      payment_method: paymentMethod,
    })

    setSubmitting(false)

    if (error) {
      alert('Something went wrong: ' + error.message)
    } else {
      setSuccess(true)
      clearCart()
    }
  }

  if (success) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-semibold text-gray-900">Order received 🎉</h2>
        <p className="text-gray-600 mt-2">
          {paymentMethod === 'transfer'
            ? 'Please send payment confirmation via WhatsApp to complete your order.'
            : "We'll contact you shortly to confirm delivery."}
        </p>
      </div>
    )
  }

  if (cart.length === 0) {
    return <div className="max-w-md mx-auto px-4 py-10 text-center text-gray-500">Your cart is empty.</div>
  }

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">Your Cart</h2>
      {cart.map((item) => (
        <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100">
          <div>
            <p className="text-sm font-medium">{item.name}</p>
            <p className="text-xs text-gray-500">Qty: {item.qty}</p>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-sm">₦{(item.price * item.qty).toLocaleString()}</p>
            <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-500">
              Remove
            </button>
          </div>
        </div>
      ))}
      <p className="text-right font-semibold mt-3">Total: ₦{total.toLocaleString()}</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <input
          required
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        />
        <input
          required
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        />
        <textarea
          required
          placeholder="Delivery address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        />
        <select
          value={zone}
          onChange={(e) => setZone(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          <option value="lagos_same_day">Lagos (Mainland/Island) — Same day</option>
          <option value="lagos_next_day">Lagos (Outer) — Next day</option>
          <option value="ogun">Ogun State — Next day</option>
        </select>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          <option value="transfer">Bank Transfer</option>
          <option value="cod">Cash on Delivery</option>
        </select>
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-gray-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-50"
        >
          {submitting ? 'Placing order...' : 'Place Order'}
        </button>
      </form>
    </div>
  )
}

export default Checkout