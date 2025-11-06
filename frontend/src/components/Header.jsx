import React from 'react'
import '../styles/Header.css'

function Header({ currentPage, setCurrentPage, cartCount, user, onLogout }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <h1 className="logo">Vibe Commerce</h1>
        </div>

        <nav className="nav-menu">
          <button
            className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => setCurrentPage('home')}
          >
            Home
          </button>
          <button
            className={`nav-link ${currentPage === 'products' ? 'active' : ''}`}
            onClick={() => setCurrentPage('products')}
          >
            Products
          </button>
          <button
            className={`nav-link cart-link ${currentPage === 'cart' ? 'active' : ''}`}
            onClick={() => setCurrentPage('cart')}
          >
            🛒 Cart
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </nav>

        <div className="user-section">
          {user && (
            <>
              <span className="user-greeting">Hello, {user.name}</span>
              <button className="logout-btn" onClick={onLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
