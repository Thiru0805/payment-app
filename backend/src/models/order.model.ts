import mongoose, { Schema, Document } from 'mongoose';

export interface IRefund {
  refund_id: string;
  refund_amount: string;
  refund_status: string;
  refunded_at: Date;
}

export interface IOrder extends Document {
  order_id: string;
  amount: string;
  status: string;
  customer_id: string;
  customer_email: string;
  customer_phone: string;
  refund?: IRefund;
  createdAt: Date;
  updatedAt: Date;
}

const RefundSchema: Schema = new Schema(
  {
    refund_id: { type: String },
    refund_amount: { type: String },
    refund_status: { type: String },
    refunded_at: { type: Date },
  },
  { _id: false } 
);

const OrderSchema: Schema = new Schema(
  {
    order_id: { type: String, required: true, unique: true },
    amount: { type: String, required: true },
    status: { type: String, required: true },
    customer_id: { type: String, required: true },
    customer_email: { type: String, required: true },
    customer_phone: { type: String, required: true },
    refund: { type: RefundSchema, default: null },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model<IOrder>('Order', OrderSchema);

export default OrderModel;
