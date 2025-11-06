import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    description: {
      type: String,
      trim: true
    },
    image: {
      type: String
    },
    category: {
      type: String,
      trim: true
    },
    stock: {
      type: Number,
      default: 100
    }
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
