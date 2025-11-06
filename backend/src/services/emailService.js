import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter with Gmail
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Verify transporter connection
transporter.verify((error, success) => {
  if (error) {
    console.warn('Email service warning:', error.message);
    console.warn('Emails will not be sent. Configure EMAIL_USER and EMAIL_PASSWORD in .env');
  } else if (success) {
    console.log('✅ Email service is ready to send emails');
  }
});

/**
 * Send order confirmation email
 */
export async function sendOrderConfirmationEmail(orderData) {
  try {
    const { userEmail, userName, orderId, items, totalAmount, timestamp } = orderData;

    // Format items for email
    const itemsHtml = items.map(item => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">$${item.price.toFixed(2)}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    `).join('');

    const mailOptions = {
      from: process.env.EMAIL_FROM || 'Vibe Commerce <noreply@vibecommerce.com>',
      to: userEmail,
      subject: `Order Confirmation - Order #${orderId}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                color: #333;
                line-height: 1.6;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f9f9f9;
              }
              .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                text-align: center;
                border-radius: 8px 8px 0 0;
              }
              .header h1 {
                margin: 0;
                font-size: 28px;
              }
              .content {
                background-color: white;
                padding: 30px;
                border-radius: 0 0 8px 8px;
              }
              .order-details {
                background-color: #f5f5f5;
                padding: 15px;
                border-radius: 5px;
                margin: 20px 0;
              }
              .order-details p {
                margin: 8px 0;
              }
              .order-details strong {
                color: #667eea;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
              }
              table th {
                background-color: #667eea;
                color: white;
                padding: 12px;
                text-align: left;
              }
              .total-row {
                font-weight: bold;
                font-size: 18px;
                color: #667eea;
              }
              .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #ddd;
                color: #666;
                font-size: 12px;
              }
              .button {
                display: inline-block;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 12px 30px;
                text-decoration: none;
                border-radius: 5px;
                margin: 20px 0;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Order Confirmed! 🎉</h1>
                <p>Thank you for your purchase</p>
              </div>
              
              <div class="content">
                <p>Hi <strong>${userName}</strong>,</p>
                
                <p>Thank you for shopping with Vibe Commerce! Your order has been successfully placed and will be processed shortly.</p>
                
                <div class="order-details">
                  <p><strong>Order ID:</strong> ${orderId}</p>
                  <p><strong>Order Date:</strong> ${new Date(timestamp).toLocaleString()}</p>
                  <p><strong>Email:</strong> ${userEmail}</p>
                </div>

                <h3 style="color: #667eea; margin-top: 30px;">Order Summary</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsHtml}
                    <tr class="total-row">
                      <td colspan="3" style="text-align: right; padding: 15px;">Total Amount:</td>
                      <td style="text-align: right; padding: 15px;">$${totalAmount.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>

                <p style="background-color: #e8f4f8; padding: 15px; border-left: 4px solid #667eea; border-radius: 4px;">
                  <strong>📦 What's Next?</strong><br>
                  Your order is being prepared and will be shipped soon. You'll receive another email with tracking information once your order ships.
                </p>

                <a href="http://localhost:3000" class="button">Continue Shopping</a>

                <div class="footer">
                  <p>If you have any questions about your order, please contact us at support@vibecommerce.com</p>
                  <p>&copy; 2025 Vibe Commerce. All rights reserved.</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Order confirmation email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Failed to send order confirmation email:', error.message);
    // Don't throw - email failure shouldn't block order completion
    return { success: false, error: error.message };
  }
}

/**
 * Send welcome email
 */
export async function sendWelcomeEmail(email, name) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'Vibe Commerce <noreply@vibecommerce.com>',
      to: email,
      subject: 'Welcome to Vibe Commerce! 🎉',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f9f9f9;
              }
              .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                text-align: center;
                border-radius: 8px 8px 0 0;
              }
              .content {
                background-color: white;
                padding: 30px;
                border-radius: 0 0 8px 8px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Welcome to Vibe Commerce! ✨</h1>
              </div>
              <div class="content">
                <p>Hi <strong>${name}</strong>,</p>
                <p>Welcome to Vibe Commerce! We're excited to have you join our community of luxury shoppers.</p>
                <p>Your account has been successfully created. You can now explore our exclusive collection of premium products.</p>
                <p>Happy shopping!</p>
                <p>Best regards,<br>The Vibe Commerce Team</p>
              </div>
            </div>
          </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Welcome email sent to:', email);
    return { success: true };
  } catch (error) {
    console.error('❌ Failed to send welcome email:', error.message);
    return { success: false, error: error.message };
  }
}

export default { sendOrderConfirmationEmail, sendWelcomeEmail };
