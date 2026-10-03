function AboutModal({ open, onClose }) {
  if (!open) return null

  return (
    <div
      className="about-modal fixed inset-0 z-50 flex items-center justify-center px-6"
      onClick={onClose}
    >
      <div className="modal-overlay absolute inset-0 bg-black/60" />
      <div
        className="about-card glass-panel relative max-w-md w-full p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="modal-close absolute top-4 right-4 text-sm"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          Close
        </button>
        <h2
          className="about-title text-2xl mb-4"
          style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 700 }}
        >
          About Netshop
        </h2>
        <p
          className="about-copy text-sm leading-relaxed"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          Netshop is a Lagos-based storefront built for people who want the hottest
          items delivered fast, discreetly, and without fuss. We handle every order
          personally — no middlemen, no unmarked boxes going astray.
        </p>
        <p
          className="about-note text-xs mt-4"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          Questions before you order? Reach us directly on WhatsApp — link's in the footer.
        </p>
      </div>
    </div>
  )
}

export default AboutModal
