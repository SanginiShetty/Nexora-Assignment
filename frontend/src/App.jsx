import React, { useState, useEffect } from 'react'
import './App.css'
import Auth from './pages/Auth'
import Products from './pages/Products'
import Cart from './pages/Cart'
import ReceiptModal from './components/ReceiptModal'
import Header from './components/Header'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [currentPage, setCurrentPage] = useState('home')
  const [cart, setCart] = useState([])
  const [receipt, setReceipt] = useState(null)
  const [showReceipt, setShowReceipt] = useState(false)

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    if (token && savedUser) {
      setIsAuthenticated(true)
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const handleAuthSuccess = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
    setCurrentPage('home')
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsAuthenticated(false)
    setUser(null)
    setCurrentPage('home')
    setCart([])
  }

  const handleCheckout = (receiptData) => {
    setReceipt(receiptData)
    setShowReceipt(true)
    setCart([])
    setCurrentPage('home')
  }

  const handleCloseReceipt = () => {
    setShowReceipt(false)
    setReceipt(null)
  }

  if (!isAuthenticated) {
    return <Auth onAuthSuccess={handleAuthSuccess} />
  }

  // Calculate total items in cart (sum of all quantities)
  const totalCartItems = cart.reduce((total, item) => total + (item.quantity || 1), 0)

  return (
    <div className="app">
      <Header 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cartCount={totalCartItems}
        user={user}
        onLogout={handleLogout}
      />

      <main className="main-content">
        {currentPage === 'home' && <Products cart={cart} setCart={setCart} />}
        {currentPage === 'products' && <Products cart={cart} setCart={setCart} />}
        {currentPage === 'cart' && (
          <Cart cart={cart} setCart={setCart} onCheckout={handleCheckout} />
        )}
      </main>

      {showReceipt && (
        <ReceiptModal receipt={receipt} onClose={handleCloseReceipt} />
      )}

      <footer className="footer">
        <p>&copy; 2025 Vibe Commerce. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
