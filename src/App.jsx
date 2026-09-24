import { useState } from 'react'
import ProductGrid from './ProductGrid'
import { CartProvider } from './CartContext'
import Checkout from './Checkout'
import Nav from './Nav'
import Hero from './Hero'

function App() {
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <CartProvider>
      <div className="bg-[#241419] min-h-screen">
        <Nav onOpenCart={() => setCartOpen(true)} />
        <Hero />
        <ProductGrid />
        {cartOpen && <Checkout onClose={() => setCartOpen(false)} />}
      </div>
    </CartProvider>
  )
}

export default App