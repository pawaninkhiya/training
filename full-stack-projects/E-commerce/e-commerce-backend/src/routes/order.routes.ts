import express from "express";
import {
  allOrders,
  myOrders,
  newOrder,
  getSingleOrder,
  processOrder,
  deleteOrder,
} from "../controllers/order.controllers";
import { adminOnly } from "../middlewares/auth.middleware";

const router = express.Router();

// http://localhost:3000/api/order/v1/new
router.post("/new", newOrder);

// http://localhost:3000/api/order/v1/my?id=userId
router.get("/my", myOrders);

// http://localhost:3000/api/order/v1/all?=adminId
router.get("/all", adminOnly, allOrders);

// http://localhost:3000/api/order/v1/:id
router
  .route("/:id")
  .get(getSingleOrder)
  .put(adminOnly, processOrder)
  .delete(adminOnly, deleteOrder);

export default router;
