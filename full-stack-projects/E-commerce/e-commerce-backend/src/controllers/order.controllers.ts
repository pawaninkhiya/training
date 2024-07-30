import { Order } from "../models/order.models";
import { NewOrderRequestBody } from "../types/types";
import { ErrorHandler, TryCatch } from "../utils/errorHandler";
import { NextFunction, Request, Response } from "express";
import { invaildateCache, reduceStock } from "../utils/features";

const newOrder = TryCatch(
  async (req: Request<{}, {}, NewOrderRequestBody>, resp, next) => {
    const {
      shippingInfo,
      shippingCharges,
      orderItems,
      discount,
      subtotal,
      total,
      tax,
      user,
    } = req.body;

    if (
      !shippingInfo ||
      !shippingCharges ||
      !orderItems ||
      !discount ||
      !subtotal ||
      !total ||
      !tax ||
      !user
    ) {
      return next(new ErrorHandler("All enter all field", 400));
    }
    let newOrder = {
      shippingInfo,
      shippingCharges,
      orderItems,
      discount,
      subtotal,
      total,
      tax,
      user,
    };
    await Order.create(newOrder);
    await reduceStock(orderItems);
    await invaildateCache({ product: true, order: true, admin: true });
    return resp.status(200).json({
      success: true,
      message: "Order created successfully",
    });
  }
);

export { newOrder };

// {
//   "shippingInfo": {
//     "address": "123 Main St",
//     "city": "Springfield",
//     "state": "IL",
//     "country": "USA",
//     "pinCode": 62701
//   },
//   "user": "60d21b4667d0d8992e610c85",  // Replace with a valid user ID
//   "subtotal": 100.50,
//   "tax": 8.75,
//   "shipingCharges": 5.99,
//   "discount": 10.00,
//   "total": 105.24,
//   "status": "Processing",
//   "orderItems": [
//     {
//       "name": "Widget A",
//       "photo": "https://example.com/widget-a.jpg",
//       "price": 25.00,
//       "quantity": 2,
//       "productId": "60d21b4967d0d8992e610c87"  // Replace with a valid product ID
//     },
//     {
//       "name": "Widget B",
//       "photo": "https://example.com/widget-b.jpg",
//       "price": 50.50,
//       "quantity": 1,
//       "productId": "60d21b4b67d0d8992e610c89"  // Replace with a valid product ID
//     }
//   ]
// }
