import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

// Mock user ID (in a real app, this would come from authentication)
const MOCK_USER_ID = 'user-123';

export async function getCart(req, res) {
  try {
    const userId = req.query.userId || MOCK_USER_ID;

    const cartItems = await Cart.find({ userId }).populate('productId');

    // Format response with product details
    const formattedItems = cartItems.map(item => ({
      id: item._id.toString(),
      product_id: item.productId._id.toString(),
      name: item.productId.name,
      price: item.productId.price,
      description: item.productId.description,
      category: item.productId.category,
      quantity: item.quantity
    }));

    // Calculate total
    const total = formattedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    res.json({
      success: true,
      data: {
        items: formattedItems,
        total: parseFloat(total.toFixed(2)),
        itemCount: formattedItems.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

export async function addToCart(req, res) {
  try {
    const { productId, quantity } = req.body;
    const userId = req.query.userId || MOCK_USER_ID;

    if (!productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: 'productId and quantity are required'
      });
    }

    // Verify product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if item already in cart
    let cartItem = await Cart.findOne({ userId, productId });

    if (cartItem) {
      // Update quantity
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // Add new item
      cartItem = new Cart({
        userId,
        productId,
        quantity
      });
      await cartItem.save();
    }

    res.json({
      success: true,
      message: 'Item added to cart',
      data: cartItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

export async function updateQuantity(req, res) {
  try {
    const { cartItemId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 0) {
      return res.status(400).json({
        success: false,
        message: 'Valid quantity is required'
      });
    }

    if (quantity === 0) {
      // Remove item if quantity is 0
      await Cart.findByIdAndDelete(cartItemId);
      return res.json({
        success: true,
        message: 'Item removed from cart'
      });
    }

    const cartItem = await Cart.findByIdAndUpdate(
      cartItemId,
      { quantity },
      { new: true }
    );

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found'
      });
    }

    res.json({
      success: true,
      message: 'Quantity updated',
      data: { cartItemId, quantity }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

export async function removeFromCart(req, res) {
  try {
    const { cartItemId } = req.params;

    const cartItem = await Cart.findByIdAndDelete(cartItemId);

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found'
      });
    }

    res.json({
      success: true,
      message: 'Item removed from cart'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

export async function clearCart(req, res) {
  try {
    const userId = req.query.userId || MOCK_USER_ID;

    await Cart.deleteMany({ userId });

    res.json({
      success: true,
      message: 'Cart cleared'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}
