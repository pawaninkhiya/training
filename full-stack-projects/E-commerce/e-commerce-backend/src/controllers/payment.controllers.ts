import { Coupon } from "../models/coupon.model";
import { ErrorHandler, TryCatch } from "../utils/errorHandler";

const newCoupon = TryCatch(async (req, resp, next) => {
  const { code, amount } = req.body;
  if (!code || !amount) {
    return next(new ErrorHandler("Please enter bothcoupon and amount", 400));
  }
  await Coupon.create({
    code,
    amount,
  });

  return resp.status(201).json({
    succuss: true,
    message: `Coupon ${code} created successfully`,
  });
});

const applyDiscount = TryCatch(async (req, resp, next) => {
  const { coupon } = req.query;
  const discount = await Coupon.findOne({ code: coupon });
  if (!discount) {
    return next(new ErrorHandler("Invalid Coupon Code", 400));
  }

  resp.status(200).json({
    success: true,
    message: `Discount applied successfully`,
    data: {
      discount: discount.amount,
    },
  });
});

const allCoupons = TryCatch(async (req, resp, next) => {
  const coupons = await Coupon.find();
  resp.status(200).json({
    success: true,
    data: coupons,
  });
});

const deleteCoupon = TryCatch(async (req, resp, next) => {
  const { id } = req.params;
  const coupon = await Coupon.findByIdAndDelete(id);
  if (!coupon) {
    return next(new ErrorHandler("Invalid Coupon ID", 400));
  }
  resp.status(200).json({
    success: true,
    message: "Coupon deleted successfully",
  });
});

export { newCoupon, applyDiscount, allCoupons, deleteCoupon };
