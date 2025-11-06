import React, { useState } from 'react'
import '../styles/ProductCard.css'

function ProductCard({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    onAddToCart(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="product-card">
      <div className="product-image">
        <div className="image-placeholder">
          {product.category === 'Electronics' && '📱'}
          {product.category === 'Accessories' && '🎧'}
          {product.category === 'Cables' && '🔌'}
        </div>
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="category">{product.category}</p>
        <p className="description">{product.description}</p>
        <div className="product-footer">
          <span className="price">${product.price.toFixed(2)}</span>
          <div className="quantity-selector">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="qty-btn"
            >
              −
            </button>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="qty-input"
            />
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="qty-btn"
            >
              +
            </button>
          </div>
        </div>
        <button
          className={`add-to-cart-btn ${added ? 'added' : ''}`}
          onClick={handleAddToCart}
        >
          {added ? '✓ Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}

export default ProductCard
