import { useState, useEffect } from 'react'
import { supabase } from './lib/supabaseClient'
import { useCart } from './CartContext'

function ProductGrid() {
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

  if (loading)
    return (
      <div className="min-h-screen bg-[#241419] flex items-center justify-center text-[#F5EDE6]/50 text-sm tracking-wide">
        loading
      </div>
    )
  if (error)
    return (
      <div className="min-h-screen bg-[#241419] flex items-center justify-center text-[#B8574E] text-sm">
        {error}
      </div>
    )

  return (
    <div className="min-h-screen bg-[#241419]">

      <div className="max-w-5xl mx-auto px-6 pb-20 grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-10">
        {products.map((product) => (
          <div key={product.id} className="group">
            <div className="relative aspect-[3/4] bg-[#3A2530] overflow-hidden">
              <img
                src={product.images}
                alt={product.name}
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
              />
              {product.is_trending && (
                <span
                  className="absolute top-3 left-3 text-[10px] tracking-wide text-[#241419] bg-[#C9A876] px-2 py-1"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  trending
                </span>
              )}
            </div>

            <div className="mt-3">
              <h3
                className="text-[#F5EDE6] text-lg leading-tight"
                style={{ fontFamily: "'Fraunces', Georgia, serif" }}
              >
                {product.name}
              </h3>
              <div className="flex items-center justify-between mt-2">
                <p className="text-[#C9A876] text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                  ₦{Number(product.price).toLocaleString()}
                </p>
                <button
                  onClick={() => addToCart(product)}
                  className="text-[#F5EDE6] text-xs border border-[#F5EDE6]/30 px-3 py-1.5 hover:bg-[#B8574E] hover:border-[#B8574E] transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductGrid