import express from "express";
import { newOrder } from "../controllers/order.controllers";

const router = express.Router();

router.post("/new", newOrder);

export default router;
