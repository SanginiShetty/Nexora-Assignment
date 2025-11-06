import React, { useState } from 'react'
import CartItem from '../components/CartItem'
import CheckoutForm from '../components/CheckoutForm'
import '../styles/Cart.css'

function Cart({ cart, setCart, onCheckout }) {
  const [showCheckout, setShowCheckout] = useState(false)

  const handleRemoveItem = (productId) => {
    setCart(cart.filter(item => (item._id || item.id) !== productId))
  }

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId)
    } else {
      setCart(cart.map(item =>
        (item._id || item.id) === productId
          ? { ...item, quantity: newQuantity }
          : item
      ))
    }
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  if (!showCheckout && cart.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Add some products to get started!</p>
      </div>
    )
  }

  return (
    <div className="cart-container">
      {!showCheckout ? (
        <>
          <h2>Shopping Cart</h2>
          <div className="cart-content">
            <div className="cart-items">
              {cart.map(item => (
                <CartItem
                  key={item._id || item.id}
                  item={item}
                  onRemove={handleRemoveItem}
                  onUpdateQuantity={handleUpdateQuantity}
                />
              ))}
            </div>
            <div className="cart-summary">
              <h3>Order Summary</h3>
              <div className="summary-line">
                <span>Subtotal:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="summary-line">
                <span>Tax (estimated):</span>
                <span>${(total * 0.08).toFixed(2)}</span>
              </div>
              <div className="summary-line total">
                <span>Total:</span>
                <span>${(total * 1.08).toFixed(2)}</span>
              </div>
              <button
                className="checkout-btn"
                onClick={() => setShowCheckout(true)}
              >
                Proceed to Checkout
              </button>
              <button
                className="continue-shopping-btn"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </>
      ) : (
        <CheckoutForm
          cart={cart}
          onCheckout={onCheckout}
          onCancel={() => setShowCheckout(false)}
        />
      )}
    </div>
  )
}

export default Cart
