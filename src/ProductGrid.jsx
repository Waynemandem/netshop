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

  if (loading)
    return <div className="min-h-[40vh] flex items-center justify-center text-[#F5EDE6]/50 text-sm">loading</div>
  if (error)
    return <div className="min-h-[40vh] flex items-center justify-center text-[#B8574E] text-sm">{error}</div>

  let visible = products
  if (filter === 'trending') visible = visible.filter((p) => p.is_trending)
  if (searchTerm.trim()) {
    visible = visible.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
    )
  }

  if (visible.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-16 text-center text-[#F5EDE6]/50 text-sm">
        Nothing matches — try a different search.
      </div>
    )
  }

  const [featured, ...rest] = visible

  return (
    <div className="max-w-5xl mx-auto px-6 pb-20">
      {/* Featured — breaks the grid, only shown with no active search */}
      {!searchTerm.trim() && (
        <div className="mb-14 grid sm:grid-cols-2 gap-6 items-center">
          <div 
          onClick={() => onSelectProduct(featured)}
          className="aspect-[4/5] bg-[#3A2530] overflow-hidden">
            <img
              src={featured.images}
              alt={featured.name}
              onClick={() => onSelectProduct(featured)}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            {featured.is_trending && (
              <span
                className="inline-block text-[10px] tracking-wide text-[#241419] bg-[#C9A876] px-2 py-1 mb-3"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                trending now
              </span>
            )}
            <h2
              className="text-[#F5EDE6] text-3xl sm:text-4xl leading-tight"
              style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 500 }}
            >
              {featured.name}
            </h2>
            <p className="text-[#F5EDE6]/60 text-sm mt-3 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              {featured.description}
            </p>
            <div className="flex items-center gap-4 mt-5">
              <p className="text-[#C9A876] text-lg" style={{ fontFamily: "'Inter', sans-serif" }}>
                ₦{Number(featured.price).toLocaleString()}
              </p>
              <button
                onClick={() => addToCart(featured)}
                className="text-[#F5EDE6] text-sm border border-[#F5EDE6]/30 px-4 py-2 hover:bg-[#B8574E] hover:border-[#B8574E] transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Regular grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-10">
        {(searchTerm.trim() ? visible : rest).map((product) => (
          <div key={product.id} className="group">
            <div 
            onClick={() => onSelectProduct(product)}
            className="relative aspect-[3/4] bg-[#3A2530] overflow-hidden cursor-pointer">
              <img
                src={product.images}
                alt={product.name}
                onClick={() => onSelectProduct(product)}
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300 "
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