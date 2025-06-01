import { NextFunction, Request, Response } from 'express';
import PaymentService from '../services/payment.service';

class PaymentController {
  private paymentService = new PaymentService();
  
    public initiatePayment = async (req: Request, res: Response) => {
        const { amount } = req.body;
        const dummyRedirectUrl = await this.paymentService.initiatePayment({amount});
        res.status(200).json({ redirectUrl: dummyRedirectUrl });
   };


    public updatePayment = async (req: Request, res: Response) => {
        const  data = req;
        console.log(data)
    };
        
    public paymentStatusCheck = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {order_id} = req.params

            if (!order_id) {
                res.status(400).json({ success: false, message: 'Order ID is required' });
            }

            const status = await this.paymentService.paymentStatus(order_id);
            res.json({
                    success: true,
                    status: status,
                });
        } catch (error: any) {
            next(error)
       }
    }

    public refundPayment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { orderId } = req.params;

            const result = await this.paymentService.processRefund(orderId);

            res.status(200).json({ success: true, data: result });
        } catch (err: any) {
           next(err)
        }
    };
}

export default PaymentController;
