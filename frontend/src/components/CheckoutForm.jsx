import React, { useState } from 'react'
import { checkoutService } from '../services/api'
import '../styles/CheckoutForm.css'

function CheckoutForm({ cart, onCheckout, onCancel }) {
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    // Validation
    if (!formData.userName.trim()) {
      setError('Please enter your name')
      return
    }
    if (!formData.userEmail.trim()) {
      setError('Please enter your email')
      return
    }

    try {
      setLoading(true)
      const receipt = await checkoutService.processCheckout(
        formData.userName,
        formData.userEmail,
        cart
      )
      onCheckout(receipt)
    } catch (err) {
      console.error('Checkout error:', err)
      setError(err.response?.data?.message || 'Checkout failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="checkout-form-container">
      <h2>Checkout</h2>
      <div className="checkout-content">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h3>Delivery Information</h3>

          <div className="form-group">
            <label htmlFor="userName">Full Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="userEmail">Email Address</label>
            <input
              type="email"
              id="userEmail"
              name="userEmail"
              value={formData.userEmail}
              onChange={handleChange}
              placeholder="john@example.com"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="order-summary">
            <h4>Order Summary</h4>
            <div className="summary-items">
              {cart.map(item => (
                <div key={item._id || item.id} className="summary-item">
                  <span>{item.name} x {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="summary-total">
              <strong>Total: ${total.toFixed(2)}</strong>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={onCancel}
              disabled={loading}
            >
              Back to Cart
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Complete Purchase'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CheckoutForm
