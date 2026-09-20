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

  if (loading) return <div className="text-center py-20 text-gray-500">Loading...</div>
  if (error) return <div className="text-center py-20 text-red-500">Error: {error}</div>

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6 text-gray-900">Trending Now</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="aspect-square bg-gray-100 overflow-hidden">
              <img
                src={product.images}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-3">
              {product.is_trending && (
                <span className="inline-block text-xs font-medium text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full mb-1">
                  🔥 Trending
                </span>
              )}
              <h3 className="text-sm font-medium text-gray-900 truncate">{product.name}</h3>
              <p className="text-sm font-semibold text-gray-900 mt-1">₦{Number(product.price).toLocaleString()}</p>
              <button
                onClick={() => addToCart(product)}
                className="mt-2 w-full bg-gray-900 text-white text-sm py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductGrid