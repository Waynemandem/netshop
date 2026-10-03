import { useCart } from './useCart'

function ProductDetail({ product, onClose }) {
  const { addToCart } = useCart()
  if (!product) return null

  return (
    <div
      className="product-modal fixed inset-0 z-50 flex items-center justify-center px-6 py-10"
      onClick={onClose}
    >
      <div className="modal-overlay absolute inset-0 bg-black/60" />
      <div
        className="product-detail glass-panel relative max-w-2xl w-full grid sm:grid-cols-2 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="modal-close absolute top-4 right-4 text-sm z-10"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          Close
        </button>

        <div className="detail-image-wrap">
          <img src={product.images} alt={product.name} className="detail-image" />
        </div>

        <div className="detail-copy p-8">
          {product.is_trending && (
            <span className="trend-badge detail-badge">
              Trending
            </span>
          )}
          <h2
            className="detail-title text-3xl leading-tight"
            style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 700 }}
          >
            {product.name}
          </h2>
          <p
            className="detail-description text-sm mt-4 leading-relaxed"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            {product.description}
          </p>
          <p
            className="detail-price text-xl mt-6"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            ₦{Number(product.price).toLocaleString()}
          </p>
          <button
            onClick={() => {
              addToCart(product)
              onClose()
            }}
            className="add-button detail-add w-full mt-5 py-3 text-sm hover:opacity-90 transition-opacity"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
