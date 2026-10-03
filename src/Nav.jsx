import { useState } from 'react'
import { useCart } from './useCart'

function Nav({ onOpenCart, searchTerm, onSearchChange, onFilterChange }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { cart } = useCart()
  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0)

  return (
    <>
      <nav className="site-nav glass-panel max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        <button
          onClick={() => onFilterChange('all')}
          className="nav-brand text-xl"
        >
          Netshop
        </button>

        <div className="nav-actions flex items-center gap-4">
          {searchOpen ? (
            <input
              autoFocus
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              onBlur={() => !searchTerm && setSearchOpen(false)}
              placeholder="Search..."
              className="nav-search bg-transparent text-sm px-1 py-1 outline-none w-32 sm:w-48"
            />
          ) : (
            <button className="icon-button" onClick={() => setSearchOpen(true)} aria-label="Search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          )}

          <button className="icon-button menu-button" onClick={() => setMenuOpen(true)} aria-label="Menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            {itemCount > 0 && <span className="menu-count">{itemCount}</span>}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          className="menu-overlay fixed inset-0 bg-black/50 z-40"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="menu-drawer glass-panel absolute top-0 right-0 h-full w-72 p-8 flex flex-col gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="drawer-close self-end text-sm mb-4"
            >
              Close
            </button>
            <button
              onClick={() => {
                onFilterChange('all')
                setMenuOpen(false)
              }}
              className="drawer-link text-left text-2xl"
            >
              Home
            </button>
            <button
              onClick={() => {
                onFilterChange('trending')
                setMenuOpen(false)
              }}
              className="drawer-link text-left text-2xl"
            >
              Trending
            </button>
            <a
              href="#"
              className="drawer-link text-left text-2xl"
            >
              About
            </a>
            <button
              onClick={() => {
                setMenuOpen(false)
                onOpenCart()
              }}
              className="drawer-link drawer-cart flex items-center justify-between text-2xl mt-2 pt-6"
            >
              Cart
              <span className="drawer-count text-sm">
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
