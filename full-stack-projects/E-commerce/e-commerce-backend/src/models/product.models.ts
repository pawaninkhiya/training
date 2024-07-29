import mongoose from "mongoose";

interface IProduct {
  name: string;
  photo: string;
  price: number;
  stock: number;
  category: string;
}

const productSchema = new mongoose.Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Please enter Name"],
    },
    photo: {
      type: String,
      required: [true, "Please enter Name"],
    },
    price: {
      type: Number,
      required: [true, "Please enter Name"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter Name"],
    },
    category: {
      type: String,
      required: [true, "Please enter Category"],
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>("Product", productSchema);
