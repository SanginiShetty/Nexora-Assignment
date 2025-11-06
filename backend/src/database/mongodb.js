import mongoose from 'mongoose';
import Product from '../models/Product.js';

export async function connectDB() {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vibe-commerce';
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('✅ Connected to MongoDB successfully');

    // Check if products exist
    const productCount = await Product.countDocuments();
    
    if (productCount === 0) {
      // Seed products
      await seedProducts();
    }

    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    throw error;
  }
}

async function seedProducts() {
  const mockProducts = [
    {
      name: 'Wireless Headphones',
      price: 79.99,
      description: 'Premium noise-cancelling headphones',
      category: 'Electronics',
      stock: 50
    },
    {
      name: 'Smartphone Stand',
      price: 19.99,
      description: 'Adjustable phone stand for desk',
      category: 'Accessories',
      stock: 100
    },
    {
      name: 'USB-C Cable',
      price: 12.99,
      description: 'Fast charging USB-C cable',
      category: 'Cables',
      stock: 200
    },
    {
      name: 'Wireless Charger',
      price: 34.99,
      description: 'Fast wireless charging pad',
      category: 'Electronics',
      stock: 75
    },
    {
      name: 'Screen Protector',
      price: 9.99,
      description: 'Tempered glass screen protector',
      category: 'Accessories',
      stock: 150
    },
    {
      name: 'Phone Case',
      price: 24.99,
      description: 'Protective silicone phone case',
      category: 'Accessories',
      stock: 120
    },
    {
      name: 'Portable Speaker',
      price: 49.99,
      description: 'Waterproof Bluetooth speaker',
      category: 'Electronics',
      stock: 60
    },
    {
      name: 'Webcam 1080p',
      price: 59.99,
      description: 'Full HD webcam with microphone',
      category: 'Electronics',
      stock: 40
    },
    {
      name: 'Keyboard',
      price: 69.99,
      description: 'Mechanical gaming keyboard',
      category: 'Electronics',
      stock: 35
    },
    {
      name: 'Mouse Pad',
      price: 14.99,
      description: 'Large gaming mouse pad',
      category: 'Accessories',
      stock: 80
    }
  ];

  try {
    await Product.insertMany(mockProducts);
    console.log('✅ Seeded 10 products to MongoDB');
  } catch (error) {
    console.error('❌ Error seeding products:', error.message);
  }
}

export default connectDB;
