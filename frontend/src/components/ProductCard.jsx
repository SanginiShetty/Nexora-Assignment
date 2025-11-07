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

  // Generate unique product images based on product name and category
  const getProductImage = () => {
    // Create a hash from product name and category for deterministic unique images
    const productHash = (product.name + product.category).split('').reduce((acc, char) => {
      return ((acc << 5) - acc) + char.charCodeAt(0)
    }, 0)
    
    // Comprehensive image library organized by category
    const imageLibrary = {
      'Beauty': [
        'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80', // Red lipstick
        'https://images.unsplash.com/photo-1522331092590-5c94c20b0d6f?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80', // Makeup palette
        'https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80', // Skincare bottles
        'https://images.unsplash.com/photo-1523293182086-7651a899d37f?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80', // Face cream
        'https://images.unsplash.com/photo-1571875226054-c0d5a74fd015?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80', // Perfume
        'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80', // Hair products
      ],
      'Fashion': [
        'https://images.unsplash.com/photo-1595777707802-21b080e2e5d6?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80', // Blue dress
        'https://images.unsplash.com/photo-1516592969381-4a6e9a48f1d1?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80', // Red dress
        'https://images.unsplash.com/photo-1490481651140-80cf1bfa4d5f?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80', // White dress
        'https://images.unsplash.com/photo-1515539562141-207523c06723?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80', // Black dress
        'https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80', // Floral dress
        'https://images.unsplash.com/photo-1589411657080-4a6142642a28?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80', // Summer dress
      ],
      'Accessories': [
        'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80', // Gold earrings
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80', // Sunglasses
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80', // Headphones
        'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80', // Necklace
        'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80', // Watch
        'https://images.unsplash.com/photo-1490736967868-88aa4486c946?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80', // Sunglasses
      ],
      'Electronics': [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80', // Wireless headphones
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80', // Smart watch
        'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80', // Camera
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80', // Laptop
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80', // Phone
        'https://images.unsplash.com/photo-1588087598877-a99e13fe2c20?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80', // Tablet
      ],
      'Casual': [
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80', // White t-shirt
        'https://images.unsplash.com/photo-1516992654631-ddb4a00c0145?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80', // Black t-shirt
        'https://images.unsplash.com/photo-1542272604-787c62d465d1?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80', // Blue t-shirt
        'https://images.unsplash.com/photo-1578762996442-48f60103fc96?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80', // Red t-shirt
        'https://images.unsplash.com/photo-1505818839806-4a2d56e75955?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80', // Casual sweater
        'https://images.unsplash.com/photo-1542527487-d625cecd30fb?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80', // Hoodie
      ],
      'Formal': [
        'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80', // Black blazer
        'https://images.unsplash.com/photo-1570158268183-d1323dda928d?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80', // Blue blazer
        'https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80', // Suit jacket
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80', // Formal dress
        'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80', // Tuxedo
        'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80', // Formal shirt
      ],
      'Party': [
        'https://images.unsplash.com/photo-1547887537-6435766b0acc?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80', // Sequin dress
        'https://images.unsplash.com/photo-1552062407-291826ad53f3?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80', // Gold dress
        'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80', // Red gown
        'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80', // Black gown
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80', // Party outfit
        'https://images.unsplash.com/photo-1578762996442-48f60103fc96?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80', // Sequined top
      ],
      'Gym': [
        'https://images.unsplash.com/photo-1506629082632-401ba5c0b46e?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80', // Black leggings
        'https://images.unsplash.com/photo-1539533057440-7814a5dc7dca?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80', // Sports bra
        'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80', // Running shorts
        'https://images.unsplash.com/photo-1578762996442-48f60103fc96?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80', // Gym t-shirt
        'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80', // Sneakers
        'https://images.unsplash.com/photo-1520027519335-c3284d63b330?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80', // Sports jacket
      ]
    }
    
    const categoryImages = imageLibrary[product.category] || imageLibrary['Fashion']
    const imageIndex = Math.abs(productHash) % categoryImages.length
    return categoryImages[imageIndex]
  }

  return (
    <div className="product-card">
      <div className="product-image">
        <img 
          src={getProductImage()}
          alt={product.name}
          className="product-img"
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.nextElementSibling.style.display = 'flex'
          }}
        />
        <div className="image-placeholder">
          {product.category === 'Electronics' && '📱'}
          {product.category === 'Accessories' && '🎧'}
          {product.category === 'Cables' && '🔌'}
          {product.category === 'Beauty' && '💄'}
          {product.category === 'Fashion' && '👗'}
          {product.category === 'Casual' && '👕'}
          {product.category === 'Formal' && '🎩'}
          {product.category === 'Party' && '✨'}
          {product.category === 'Gym' && '💪'}
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
