import { model, Schema, Types, Document } from "mongoose";


interface IOrderItem extends Document {
  productId: Types.ObjectId;
  quatity: number;
}
interface IOrder extends Document {
  orderPrice: number;
  customer: Types.ObjectId;
  orderItems: IOrderItem[];
  address: string;
  status: String;
}

const orderItemsSchema = new Schema<IOrderItem>({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  quatity: {
    type: Number,
    required: true,
  },
});
const orderSchema = new Schema<IOrder>(
  {
    orderPrice: {
      type: Number,
      required: true,
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    orderItems: {
      type: [orderItemsSchema],
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "CENCELLED", "DELIEVERED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);
export const Order = model<IOrder>("Order", orderSchema);
