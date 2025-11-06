import React, { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import '../styles/Products.css'
import { productService } from '../services/api'

function Products({ cart, setCart }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const data = await productService.getAll()
      setProducts(data)
      setError(null)
    } catch (err) {
      console.error('Error fetching products:', err)
      setError('Failed to load products. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (product, quantity) => {
    // Use _id from MongoDB, or id if available
    const productId = product._id || product.id
    const existingItem = cart.find(item => (item._id || item.id) === productId)

    if (existingItem) {
      setCart(cart.map(item =>
        (item._id || item.id) === productId
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ))
    } else {
      setCart([...cart, { ...product, quantity }])
    }
  }

  const categories = ['all', 'Beauty', 'Fashion', 'Accessories', 'Electronics']
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory)

  if (loading) {
    return <div className="loading">Loading products...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  return (
    <div className="products-page">
      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-content">
          <h1>Discover Your Style</h1>
          <p>Premium Collection of Curated Products</p>
          <button className="hero-cta">Shop Now</button>
        </div>
        <div className="hero-background"></div>
      </section>

      {/* Category Filter */}
      <section className="category-section">
        <div className="category-container">
          <h2>Browse by Category</h2>
          <div className="category-buttons">
            {categories.map(cat => (
              <button
                key={cat}
                className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <div className="products-header">
          <h2>Featured Products</h2>
          <span className="product-count">{filteredProducts.length} Items</span>
        </div>
        
        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <p>No products found in this category.</p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard
                key={product._id || product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Products
