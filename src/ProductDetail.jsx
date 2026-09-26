import { useCart } from './useCart'

function ProductDetail({ product, onClose }) {
  const { addToCart } = useCart()
  if (!product) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-6 py-10"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div
        className="relative bg-[#241419] border border-[#F5EDE6]/10 max-w-2xl w-full grid sm:grid-cols-2 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#F5EDE6]/60 text-sm z-10"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          close
        </button>

        <div className="aspect-square bg-[#3A2530]">
          <img src={product.images} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <div className="p-8">
          {product.is_trending && (
            <span
              className="inline-block text-[10px] tracking-wide text-[#241419] bg-[#C9A876] px-2 py-1 mb-3"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              trending
            </span>
          )}
          <h2
            className="text-[#F5EDE6] text-3xl leading-tight"
            style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 500 }}
          >
            {product.name}
          </h2>
          <p
            className="text-[#F5EDE6]/60 text-sm mt-4 leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {product.description}
          </p>
          <p
            className="text-[#C9A876] text-xl mt-6"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            ₦{Number(product.price).toLocaleString()}
          </p>
          <button
            onClick={() => {
              addToCart(product)
              onClose()
            }}
            className="w-full mt-5 bg-[#B8574E] text-[#F5EDE6] py-3 text-sm hover:opacity-90 transition-opacity"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail