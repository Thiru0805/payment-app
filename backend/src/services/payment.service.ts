import axios from "axios";
import { JUSPAY_API_KEY, JUSPAY_MERCHANT_ID, JUSPAY_URL, REDIRECT_URL, RETURN_URL } from "../config/env";
import { ApiError } from "../middlewares/error.middleware";
import OrderModel from "../models/order.model";

class PaymentService {
    public initiatePayment = async (data: any) => {
        const { amount } = data;
        const orderId = 'order_' + Date.now();
        const customerId = 'customer_' + Date.now();

        const payload = {
            order_id: orderId,
            amount: amount.toString(),
            customer_id: customerId,
            customer_email: 'test@example.com',
            customer_phone: '9999999999',
            return_url: `${RETURN_URL}${orderId}`,
        };

        const token = Buffer.from(`${JUSPAY_API_KEY}:`).toString('base64');

        const response = await axios.post(JUSPAY_URL as string, payload, {
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${token}`,
            'x-merchantid': JUSPAY_MERCHANT_ID,
            'x-routing-id': 'customer_123',
            },
        });

        if (response.data.status !== 'CREATED') {
            throw new ApiError(400, 'Order creation failed at Juspay');
        }

        await OrderModel.create({
            order_id: orderId,
            amount: amount.toString(),
            status: response.data.status,
            customer_id: customerId,
            customer_email: 'test@example.com',
            customer_phone: '9999999999',
        });

        const redirectUrl = `${REDIRECT_URL}${response.data.id}`;
        return redirectUrl;
    };

    public paymentStatus = async (orderId: string) => {
        const token = Buffer.from(`${JUSPAY_API_KEY}:`).toString('base64');

        const response = await axios.get(`${JUSPAY_URL}/${orderId}`, {
            headers: {
                'Authorization': `Basic ${token}`,
                'x-merchantid': JUSPAY_MERCHANT_ID,
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-routing-id': 'customer_123'
            },
        });

            const status = response.data.status; 
            return status;
    }

    public refundFromJuspay = async (orderId: string) => {
        const token = Buffer.from(`${JUSPAY_API_KEY}:`).toString('base64');

        const payload = {
            order_id: orderId,
            refund_amount: '100', 
            merchant_order_id: orderId,
        };

        const response = await axios.post(`${JUSPAY_URL}/${orderId}/refunds`, payload, {
            headers: {
                'Authorization': `Basic ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-merchantid': JUSPAY_MERCHANT_ID,
                'x-routing-id': 'customer_123',
            },
        });

        return response.data;
    };

    public processRefund = async (orderId: string) => {
        const order = await OrderModel.findOne({ order_id: orderId });
        if (!order) throw new ApiError(400, 'Order not found');
        
        if (order.status !== 'CHARGED') 
        throw new ApiError(400, 'Cannot refund uncharged payment');

        if (order.refund?.refund_status === 'REFUNDED') 
        throw new ApiError(400, 'Order already refunded');

        const refundWindowDays = 30;
        const createdAt = order.createdAt;
        const now = new Date();
        const diffDays = (now.getTime() - createdAt.getTime()) / (1000 * 3600 * 24);
        if (diffDays > refundWindowDays) {
            throw new ApiError(400, 'Refund period expired');
        }

        const refundRes = await this.refundFromJuspay(orderId);

        if (refundRes.status !== 'REFUNDED') {
            throw new ApiError(400, 'Refund failed at Juspay');
        }

        order.refund = {
            refund_id: refundRes.refund_id,
            refund_amount: refundRes.refund_amount || order.amount,
            refund_status: refundRes.status,
            refunded_at: new Date(),
        };

        await order.save();

        return refundRes;
    };

}

export default PaymentService;
