import React from 'react'
import '../styles/ReceiptModal.css'

function ReceiptModal({ receipt, onClose }) {
  return (
    <div className="receipt-modal-overlay" onClick={onClose}>
      <div className="receipt-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>

        <div className="receipt-header">
          <h2>✓ Order Confirmed!</h2>
          <p className="receipt-message">Thank you for your purchase</p>
        </div>

        <div className="receipt-content">
          <div className="receipt-section">
            <h3>Order Details</h3>
            <div className="detail-row">
              <span>Order ID:</span>
              <span className="value">{receipt.orderId.substring(0, 8)}...</span>
            </div>
            <div className="detail-row">
              <span>Customer:</span>
              <span className="value">{receipt.userName}</span>
            </div>
            <div className="detail-row">
              <span>Email:</span>
              <span className="value">{receipt.userEmail}</span>
            </div>
            <div className="detail-row">
              <span>Date:</span>
              <span className="value">
                {new Date(receipt.timestamp).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="receipt-section">
            <h3>Items Ordered</h3>
            <div className="items-list">
              {receipt.items.map((item, index) => (
                <div key={index} className="receipt-item">
                  <div className="receipt-item-name">
                    {item.name} <span>x{item.quantity}</span>
                  </div>
                  <div className="receipt-item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="receipt-total">
            <div className="total-row">
              <span>Subtotal:</span>
              <span>${receipt.totalAmount.toFixed(2)}</span>
            </div>
            <div className="total-row final">
              <span>Total:</span>
              <span>${receipt.totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <div className="receipt-footer">
            <p>A confirmation email has been sent to {receipt.userEmail}</p>
            <p className="status">{receipt.status.toUpperCase()}</p>
          </div>
        </div>

        <button className="close-modal-btn" onClick={onClose}>
          Continue Shopping
        </button>
      </div>
    </div>
  )
}

export default ReceiptModal
