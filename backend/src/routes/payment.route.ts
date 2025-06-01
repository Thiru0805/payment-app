import express, { Router } from 'express';
import PaymentController from '../controllers/payment.controller';

class PaymentRoutes {
  public router: Router;
  private paymentController = new PaymentController();

  constructor() {
    this.router = express.Router();
    this.routes();
  }

  private routes() {
    this.router.post('/initiate', this.paymentController.initiatePayment);
    this.router.put('/update/status', this.paymentController.updatePayment);
    this.router.get('/status/:order_id', this.paymentController.paymentStatusCheck);
    this.router.post('refund/:order_id', this.paymentController.refundPayment);
  }
}

export default PaymentRoutes;
