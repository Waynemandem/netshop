function Footer() {
  return (
    <footer className="site-footer mt-4">
      <div className="footer-inner max-w-5xl mx-auto px-6 py-10 grid sm:grid-cols-3 gap-8">
        <div>
          <p className="footer-brand text-lg">Netshop</p>
          <p className="footer-copy text-xs mt-2 leading-relaxed">
            Discreet, considered, delivered fast.
          </p>
        </div>

        <div>
          <p className="footer-label text-xs tracking-wide mb-2">
            Delivery
          </p>
          <ul className="footer-list text-xs space-y-1">
            <li>Lagos (Mainland/Island) — same day</li>
            <li>Lagos (Outer) — next day</li>
            <li>Ogun State — next day</li>
          </ul>
        </div>

        <div>
          <p className="footer-label text-xs tracking-wide mb-2">
            Contact
          </p>
          <a
            href="https://wa.me/2349078740445"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link text-xs"
          >
            WhatsApp us
          </a>
        </div>
      </div>
      <div className="footer-bottom max-w-5xl mx-auto px-6 pb-8">
        <p className="footer-fine text-[11px]">
          © {new Date().getFullYear()} Netshop. All orders discreetly packaged.
        </p>
      </div>
    </footer>
  )
}

export default Footer
