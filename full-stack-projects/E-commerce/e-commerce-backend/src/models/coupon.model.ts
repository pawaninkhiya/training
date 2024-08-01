import mongoose from "mongoose";

const couponSechma = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "Please Enter the Coupon Code"],
      unique: true,
    },
    amount: {
      type: String,
      required: [true, "Please Enter the Discount Amount Code"],
    },
  },
  { timestamps: true }
);

export const Coupon = mongoose.model("Coupon", couponSechma);
