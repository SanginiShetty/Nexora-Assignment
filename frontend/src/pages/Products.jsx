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
          <h1>Find Clothes That Matches Your Style</h1>
          <p>Browse through our diverse range of meticulously curated clothes designed to bring out your individuality and cater to your sense of style.</p>
          <button className="hero-cta">Shop Now</button>
          <div style={{ marginTop: '2rem', display: 'flex', gap: '2rem' }}>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: '900' }}>200+</div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>Brands</div>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: '900' }}>2,000+</div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>Products</div>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: '900' }}>30,000+</div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>Customers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Strip */}
      <section className="brand-strip">
        <div className="brands">
          <span style={{ fontSize: '1.2rem', fontWeight: '700', color: '#fff' }}>VERSACE</span>
          <span style={{ fontSize: '1.2rem', fontWeight: '700', color: '#fff' }}>ZARA</span>
          <span style={{ fontSize: '1.2rem', fontWeight: '700', color: '#fff' }}>GUCCI</span>
          <span style={{ fontSize: '1.2rem', fontWeight: '700', color: '#fff' }}>PRADA</span>
          <span style={{ fontSize: '1.2rem', fontWeight: '700', color: '#fff' }}>Calvin Klein</span>
        </div>
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
        <div className="section-title">New Arrivals</div>
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
        
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <a href="#" style={{ fontSize: '1rem', fontWeight: '600', color: '#000' }}>View All</a>
        </div>
      </section>

      {/* Browse by Style Section */}
      <section className="browse-style">
        <div className="section-title">Browse By Dress Style</div>
        <div className="browse-grid">
          <div className="browse-card">Casual</div>
          <div className="browse-card">Formal</div>
          <div className="browse-card">Party</div>
          <div className="browse-card">Gym</div>
        </div>
      </section>

      {/* Testimonials */}
      <section>
        <div className="section-title">Our Happy Customers</div>
        <div className="testimonials">
          <div className="testimonial-card">
            <div style={{ marginBottom: '0.5rem' }}>★★★★★</div>
            <p>"This store has transformed the way I shop for clothes. I absolutely love the quality and style!"</p>
            <p style={{ fontWeight: '700', marginTop: '0.5rem' }}>Sarah M.</p>
          </div>
          <div className="testimonial-card">
            <div style={{ marginBottom: '0.5rem' }}>★★★★★</div>
            <p>"The variety of products and excellent customer service make this my go-to store every time."</p>
            <p style={{ fontWeight: '700', marginTop: '0.5rem' }}>Alex K.</p>
          </div>
          <div className="testimonial-card">
            <div style={{ marginBottom: '0.5rem' }}>★★★★★</div>
            <p>"Best shopping experience! Fast delivery and perfect quality products. Highly recommended!"</p>
            <p style={{ fontWeight: '700', marginTop: '0.5rem' }}>James L.</p>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-bar">
        <div className="newsletter-inner">
          <h3>Stay up to date about our latest offers</h3>
          <div className="newsletter-input">
            <input type="email" placeholder="Enter your email address" />
            <button>Subscribe to Newsletter</button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Products
