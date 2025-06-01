import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { checkPaymentStatus } from '../api/auth';
import '../styles/paymentComplete.css'; 

const PaymentComplete = () => {
  const [params] = useSearchParams();
  const [status, setStatus] = useState('Verifying...');
  const orderId = params.get('order_id');
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const res = await checkPaymentStatus(orderId);

        if (res.data.status === 'CHARGED') {
          setStatus('Payment Successful ✅');
        } else {
          setStatus(`Payment Failed ❌ (${res.data.status})`);
        }

        setTimeout(() => {
          navigate('/payment');
        }, 4000);

      } catch (err) {
        console.error('Error verifying payment:', err);
        setStatus('Error verifying payment');
      }
    };

    if (orderId) verifyPayment();
    else setStatus('Order ID missing');
  }, [orderId, navigate]);

  return (
    <div className="payment-complete-container">
      <h2>Payment Status</h2>
      <p className="status">{status}</p>
      <p className="redirect-msg">Redirecting back to payment page...</p>
    </div>
  );
};

export default PaymentComplete;
