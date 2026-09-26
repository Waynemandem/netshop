import { useState } from 'react'
import { useCart } from './useCart'

function Nav({ onOpenCart, searchTerm, onSearchChange, onFilterChange, onOpenAbout }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { cart } = useCart()
  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0)

  return (
    <>
      <nav className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        <button
          onClick={() => onFilterChange('all')}
          className="text-[#F5EDE6] text-xl"
          style={{ fontFamily: "'Fraunces', Georgia, serif" }}
        >
          Netshop
        </button>

        <div className="flex items-center gap-4">
          {searchOpen ? (
            <input
              autoFocus
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              onBlur={() => !searchTerm && setSearchOpen(false)}
              placeholder="Search..."
              className="bg-transparent border-b border-[#F5EDE6]/30 text-[#F5EDE6] text-sm px-1 py-1 outline-none w-32 sm:w-48"
              style={{ fontFamily: "'Inter', sans-serif" }}
            />
          ) : (
            <button onClick={() => setSearchOpen(true)} aria-label="Search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F5EDE6" strokeWidth="1.5">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          )}

          <button onClick={() => setMenuOpen(true)} aria-label="Menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F5EDE6" strokeWidth="1.5">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="absolute top-0 right-0 h-full w-72 bg-[#3A2530] p-8 flex flex-col gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="self-end text-[#F5EDE6]/60 text-sm mb-4"
            >
              close
            </button>
            <button
              onClick={() => {
                onFilterChange('all')
                setMenuOpen(false)
              }}
              className="text-left text-[#F5EDE6] text-2xl"
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}
            >
              Home
            </button>
            <button
              onClick={() => {
                onFilterChange('trending')
                setMenuOpen(false)
              }}
              className="text-left text-[#F5EDE6] text-2xl"
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}
            >
              Trending
            </button>
            <a
              href="#"
              className="text-[#F5EDE6] text-2xl"
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}
            >
              About
            </a>
            <button
              onClick={() => {
                setMenuOpen(false)
                onOpenCart()
              }}
              className="flex items-center justify-between text-[#F5EDE6] text-2xl mt-2 border-t border-[#F5EDE6]/15 pt-6"
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}
            >
              Cart
              <span className="text-sm text-[#C9A876]" style={{ fontFamily: "'Inter', sans-serif" }}>
                {itemCount}
              </span>
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Nav