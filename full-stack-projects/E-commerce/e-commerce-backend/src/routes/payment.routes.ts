import express from "express";
import {
  newCoupon,
  applyDiscount,
  allCoupons,
  deleteCoupon,
} from "../controllers/payment.controllers";

const router = express.Router();

router.post("/coupon/new", newCoupon);
router.get("/discount", applyDiscount);
router.get("/coupon/all", allCoupons);
router.delete("/coupon/:id", deleteCoupon);

export default router;
