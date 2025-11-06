import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import { sendOrderConfirmationEmail } from '../services/emailService.js';

// Mock user ID
const MOCK_USER_ID = 'user-123';

export async function checkout(req, res) {
  try {
    const { userName, userEmail, cartItems } = req.body;
    const userId = req.query.userId || MOCK_USER_ID;

    if (!userName || !userEmail || !cartItems || cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'userName, userEmail, and cartItems are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Calculate total
    const totalAmount = cartItems.reduce((sum, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 1;
      return sum + (price * quantity);
    }, 0);

    // Create order with nested items
    const orderItems = cartItems.map(item => {
      // Extract the product ID - try multiple possible fields
      let productId = null;
      if (item._id) {
        productId = item._id;
      } else if (item.product_id) {
        productId = item.product_id;
      } else if (item.id) {
        productId = item.id;
      }
      
      return {
        productId: productId, // Can be null now since it's optional
        productName: item.name || item.productName || 'Unknown Product',
        quantity: parseInt(item.quantity) || 1,
        price: parseFloat(item.price) || 0
      };
    });

    const order = new Order({
      userName: userName.trim(),
      userEmail: userEmail.trim(),
      userId,
      items: orderItems,
      totalAmount: parseFloat(totalAmount.toFixed(2)),
      itemsCount: cartItems.length,
      status: 'completed'
    });

    // Save order to database
    await order.save();

    // Clear cart after successful order
    await Cart.deleteMany({ userId });

    // Send order confirmation email
    const emailResult = await sendOrderConfirmationEmail({
      userEmail: userEmail.trim(),
      userName: userName.trim(),
      orderId: order._id.toString(),
      items: cartItems,
      totalAmount: order.totalAmount,
      timestamp: order.createdAt
    });

    if (emailResult.success) {
      console.log('✅ Order confirmation email sent successfully');
    } else {
      console.warn('⚠️ Order created but email failed to send:', emailResult.error);
    }

    // Generate receipt
    const receipt = {
      orderId: order._id.toString(),
      userName,
      userEmail,
      items: cartItems,
      totalAmount: order.totalAmount,
      timestamp: order.createdAt,
      status: 'completed',
      emailSent: emailResult.success
    };

    res.json({
      success: true,
      message: 'Order processed successfully',
      data: receipt
    });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to process checkout'
    });
  }
}
