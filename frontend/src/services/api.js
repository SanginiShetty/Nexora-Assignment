import axios from 'axios'

const API_BASE_URL = 'http://localhost:4000/api'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const productService = {
  getAll: async () => {
    const response = await apiClient.get('/products')
    return response.data.data
  },
  getById: async (id) => {
    const response = await apiClient.get(`/products/${id}`)
    return response.data.data
  }
}

export const cartService = {
  getCart: async () => {
    const response = await apiClient.get('/cart')
    return response.data.data
  },
  addItem: async (productId, quantity) => {
    const response = await apiClient.post('/cart', { productId, quantity })
    return response.data.data
  },
  updateQuantity: async (cartItemId, quantity) => {
    const response = await apiClient.put(`/cart/${cartItemId}`, { quantity })
    return response.data.data
  },
  removeItem: async (cartItemId) => {
    const response = await apiClient.delete(`/cart/${cartItemId}`)
    return response.data
  },
  clearCart: async () => {
    const response = await apiClient.delete('/cart')
    return response.data
  }
}

export const checkoutService = {
  processCheckout: async (userName, userEmail, cartItems) => {
    // Format cart items to ensure all required fields are present
    const formattedItems = cartItems.map(item => ({
      _id: item._id || item.id,
      id: item._id || item.id,
      name: item.name || item.productName,
      price: item.price,
      quantity: item.quantity
    }))
    
    const response = await apiClient.post('/checkout', {
      userName,
      userEmail,
      cartItems: formattedItems
    })
    return response.data.data
  }
}
