import { Order } from "../models/order.models";
import { NewOrderRequestBody } from "../types/types";
import { ErrorHandler, TryCatch } from "../utils/errorHandler";
import { NextFunction, Request, Response } from "express";
import { invaildateCache, reduceStock } from "../utils/features";
import { myCache } from "./product.controllers";

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
    const order = await Order.create(newOrder);
    await reduceStock(orderItems);
    await invaildateCache({
      product: true,
      order: true,
      admin: true,
      userId: user,
      // productId: order
    });

    return resp.status(200).json({
      success: true,
      message: "Order created successfully",
    });
  }
);

const myOrders = TryCatch(async (req, resp, next) => {
  const { id: user } = req.query;
  if (!user) {
    return next(new ErrorHandler("Please provide user id", 400));
  }
  let orders = [];
  if (myCache.has("orders")) {
    orders = JSON.parse(myCache.get("") as string);
  } else {
    orders = await Order.find({ user });
    myCache.set("orders", JSON.stringify(orders));
  }
  resp.status(200).json({
    success: true,
    data: orders,
    message: "Orders  fetched succusfully !",
  });
});

const allOrders = TryCatch(async (req, resp, next) => {
  let orders = [];
  if (myCache.has("all-orders")) {
    orders = JSON.parse(myCache.get("all-orders") as string);
  } else {
    orders = await Order.find({}).populate("user", "name");
    myCache.set("all-orders", JSON.stringify(orders));
  }
  resp.status(200).json({
    success: true,
    data: orders,
    message: "Orders  fetched succusfully !",
  });
});

const getSingleOrder = TryCatch(async (req, resp, next) => {
  const { id } = req.params;
  const key = `order-${id}`;
  let order;
  if (myCache.has(key)) {
    order = JSON.parse(myCache.get(key) as string);
  } else {
    order = await Order.findById(id).populate("user", "name");
    if (!order) {
      return next(new ErrorHandler("Order not found", 404));
    }
    myCache.set(key, JSON.stringify(order));
  }
  await order.save();
  resp.status(200).json({
    success: true,
    data: order,
    message: "Order  fetched succusfully !",
  });
});

const processOrder = TryCatch(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findById(id);

  if (!order) return next(new ErrorHandler("Order Not Found", 404));

  switch (order.status) {
    case "Processing":
      order.status = "Shipped";
      break;
    case "Shipped":
      order.status = "Delivered";
      break;
    default:
      order.status = "Delivered";
      break;
  }

  await order.save();

  await invaildateCache({
    product: false,
    order: true,
    admin: true,
    userId: String(order.user),
    orderId: String(order._id),
  });

  if (!order.user) {
    return next(new ErrorHandler("Invalid user ID", 404));
  }
  await invaildateCache({
    product: false,
    order: true,
    admin: true,
    userId: order?.user,
    orderId: String(order._id),
    productId: order.orderItems.map((i) => String(i.productId)),
  });

  return res.status(200).json({
    success: true,
    message: "Order Processed Successfully",
  });
});

const deleteOrder = TryCatch(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findById(id);
  if (!order) return next(new ErrorHandler("Order Not Found", 404));

  await order.deleteOne();
  await invaildateCache({
    product: false,
    order: true,
    admin: true,
    userId: String(order.user),
    orderId: String(order._id),
  });

  return res.status(200).json({
    success: true,
    message: "Order Deleted Successfully",
  });
});

export {
  newOrder,
  myOrders,
  allOrders,
  getSingleOrder,
  processOrder,
  deleteOrder,
};

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
