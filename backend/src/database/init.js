// In-memory database store
const database = {
  products: [],
  carts: {},
  orders: [],
  orderItems: []
};

export function initDatabase() {
  try {
    // Initialize products if empty
    if (database.products.length === 0) {
      const mockProducts = [
        { id: '1', name: 'Wireless Headphones', price: 79.99, description: 'Premium noise-cancelling headphones', category: 'Electronics' },
        { id: '2', name: 'Smartphone Stand', price: 19.99, description: 'Adjustable phone stand for desk', category: 'Accessories' },
        { id: '3', name: 'USB-C Cable', price: 12.99, description: 'Fast charging USB-C cable', category: 'Cables' },
        { id: '4', name: 'Wireless Charger', price: 34.99, description: 'Fast wireless charging pad', category: 'Electronics' },
        { id: '5', name: 'Screen Protector', price: 9.99, description: 'Tempered glass screen protector', category: 'Accessories' },
        { id: '6', name: 'Phone Case', price: 24.99, description: 'Protective silicone phone case', category: 'Accessories' },
        { id: '7', name: 'Portable Speaker', price: 49.99, description: 'Waterproof Bluetooth speaker', category: 'Electronics' },
        { id: '8', name: 'Webcam 1080p', price: 59.99, description: 'Full HD webcam with microphone', category: 'Electronics' },
        { id: '9', name: 'Keyboard', price: 69.99, description: 'Mechanical gaming keyboard', category: 'Electronics' },
        { id: '10', name: 'Mouse Pad', price: 14.99, description: 'Large gaming mouse pad', category: 'Accessories' }
      ];

      database.products = mockProducts;
    }

    // Initialize user carts
    if (!database.carts['user-123']) {
      database.carts['user-123'] = [];
    }

    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization error:', error.message);
    throw error;
  }
}

export const db = database;

export default database;
