import React from 'react'
import '../styles/CartItem.css'

function CartItem({ item, onRemove, onUpdateQuantity }) {
  return (
    <div className="cart-item">
      <div className="item-image">
        {item.category === 'Electronics' && '📱'}
        {item.category === 'Accessories' && '🎧'}
        {item.category === 'Cables' && '🔌'}
      </div>
      <div className="item-details">
        <h4>{item.name}</h4>
        <p className="item-category">{item.category}</p>
        <p className="item-price">${item.price.toFixed(2)} each</p>
      </div>
      <div className="item-quantity">
        <button onClick={() => onUpdateQuantity(item._id || item.id, item.quantity - 1)}>−</button>
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => onUpdateQuantity(item._id || item.id, Math.max(1, parseInt(e.target.value) || 1))}
        />
        <button onClick={() => onUpdateQuantity(item._id || item.id, item.quantity + 1)}>+</button>
      </div>
      <div className="item-total">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
      <button
        className="remove-btn"
        onClick={() => onRemove(item._id || item.id)}
        title="Remove item"
      >
        ✕
      </button>
    </div>
  )
}

export default CartItem
