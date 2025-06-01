import { Routes, Route } from 'react-router-dom';
import Home from './pages/home.jsx';
import Login from './pages/login.jsx';
import Signup from './pages/signup.jsx';
import Payment from './pages/payment.jsx';
import PaymentComplete from './pages/paymentComplete.jsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/payment/complete" element={<PaymentComplete />} />
    </Routes>
  );
};

export default App;
