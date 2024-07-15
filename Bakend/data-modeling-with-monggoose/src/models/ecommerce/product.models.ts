import { model, Schema, Types,Document } from "mongoose";

interface IProduct extends Document {
  description: string;
  name: string;
  productImage: string;
  price: number;
  stock: number;
  productCategory: Types.ObjectId;
  owner: Types.ObjectId;
}
const productSchema = new Schema<IProduct>(
  {
    description: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    productImage: {
      type: String,
      required: true,
    },
    productCategory: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
export const Product = model("Product", productSchema);
