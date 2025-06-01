import { useState } from 'react';
import '../styles/payment.css'; 
import { initiatePayment, refundPayment } from '../api/auth';

const Payment = () => {
  const [amount, setAmount] = useState('');
  const [orderId, setOrderId] = useState('');

  const handlePayment = async () => {
    try {
      if (!amount || isNaN(amount)) {
        alert('Please enter a valid amount');
        return;
      }

      const data = await initiatePayment(amount);
      if (data.success && data.data?.redirectUrl) {
        setOrderId(data.data.orderId);
        window.location.href = data.data.redirectUrl;
      } else {
        alert('Payment initialization failed');
      }
    } catch (error) {
      console.error(error);
      alert('Error initiating payment');
    }
  };

  const handleRefund = async () => {
    try {
      if (!orderId) {
        alert('No order ID found for refund');
        return;
      }

      const result = await refundPayment(orderId); 
      if (result.success) {
        alert('Refund successful');
      } else {
        alert('Refund failed: ' + result.message);
      }
    } catch (error) {
      console.error(error);
      alert('Error processing refund');
    }
};

  return (
    <div className="payment-container">
      <h2>Make a Payment</h2>
      <input
        type="number"
        placeholder="Enter amount (₹)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="payment-input"
      />
      <div className="payment-buttons">
        <button onClick={handlePayment}>Pay ₹{amount || 0}</button>
        <button onClick={handleRefund} disabled={!orderId}>
          Refund
        </button>
      </div>
    </div>
  );
};

export default Payment;
