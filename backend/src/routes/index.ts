import express from 'express';
import AuthRoutes from './auth.route';
import PaymentRoutes from './payment.route';

const router = express.Router();

const authRoutes = new AuthRoutes(); 
const paymentRoutes = new PaymentRoutes(); 

router.use('/auth', authRoutes.router); 
router.use('/payment', paymentRoutes.router);

export default router;
