function Footer() {
  return (
    <footer className="border-t border-[#F5EDE6]/10 mt-4">
      <div className="max-w-5xl mx-auto px-6 py-10 grid sm:grid-cols-3 gap-8">
        <div>
          <p className="text-[#F5EDE6] text-lg" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
            Netshop
          </p>
          <p className="text-[#F5EDE6]/50 text-xs mt-2 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
            Discreet, considered, delivered fast.
          </p>
        </div>

        <div>
          <p className="text-[#C9A876] text-xs tracking-wide mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
            Delivery
          </p>
          <ul className="text-[#F5EDE6]/60 text-xs space-y-1" style={{ fontFamily: "'Inter', sans-serif" }}>
            <li>Lagos (Mainland/Island) — same day</li>
            <li>Lagos (Outer) — next day</li>
            <li>Ogun State — next day</li>
          </ul>
        </div>

        <div>
          <p className="text-[#C9A876] text-xs tracking-wide mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
            Contact
          </p>
          <a
            href="https://wa.me/2349078740445"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#F5EDE6]/60 text-xs hover:text-[#F5EDE6] transition-colors"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            WhatsApp us
          </a>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6 pb-8">
        <p className="text-[#F5EDE6]/30 text-[11px]" style={{ fontFamily: "'Inter', sans-serif" }}>
          © {new Date().getFullYear()} Netshop. All orders discreetly packaged.
        </p>
      </div>
    </footer>
  )
}

export default Footer