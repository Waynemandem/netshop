import { useState } from 'react'
import ProductGrid from './ProductGrid'
import { CartProvider } from './CartContext'
import Checkout from './Checkout'
import Nav from './Nav'
import Hero from './Hero'
import Footer from './Footer'
import AboutModal from './AboutModal'
import ProductDetail from './ProductDetail'

function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')

  return (
    <CartProvider>
      <div className="bg-[#241419] min-h-screen flex flex-col">
        <Nav
          onOpenCart={() => setCartOpen(true)}
          onOpenAbout={() => setAboutOpen(true)}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onFilterChange={setFilter}
        />
        <Hero />
        <div className="flex-1">
          <ProductGrid
            searchTerm={searchTerm}
            filter={filter}
            onSelectProduct={setSelectedProduct}
          />
        </div>
        <Footer />
      </div>

      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          cartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-black/60" onClick={() => setCartOpen(false)} />
        <div
          className={`absolute top-0 right-0 h-full w-full sm:w-[420px] bg-[#241419] shadow-2xl transition-transform duration-300 ${
            cartOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <Checkout onClose={() => setCartOpen(false)} />
        </div>
      </div>

      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
      <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </CartProvider>
  )
}

export default App