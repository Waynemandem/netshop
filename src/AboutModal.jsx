function AboutModal({ open, onClose }) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div
        className="relative bg-[#241419] border border-[#F5EDE6]/10 max-w-md w-full p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#F5EDE6]/50 text-sm"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          close
        </button>
        <h2
          className="text-[#F5EDE6] text-2xl mb-4"
          style={{ fontFamily: "'Fraunces', Georgia, serif" }}
        >
          About Netshop
        </h2>
        <p
          className="text-[#F5EDE6]/70 text-sm leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Netshop is a Lagos-based storefront built for people who want the hottest
          items delivered fast, discreetly, and without fuss. We handle every order
          personally — no middlemen, no unmarked boxes going astray.
        </p>
        <p
          className="text-[#F5EDE6]/50 text-xs mt-4"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Questions before you order? Reach us directly on WhatsApp — link's in the footer.
        </p>
      </div>
    </div>
  )
}

export default AboutModal