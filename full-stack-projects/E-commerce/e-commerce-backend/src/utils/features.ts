import { myCache } from "../controllers/product.controllers";
import { Order } from "../models/order.models";
import { Product } from "../models/product.models";
import { InvaildateCacheProps, OrderItemType } from "../types/types";
import { ErrorHandler } from "./errorHandler";

export const invaildateCache = async ({
  product,
  admin,
  order,
  userId,
  orderId,
  productId,
}: InvaildateCacheProps) => {
  if (product) {
    const productKeys: string[] = [
      "latest-product",
      "categories",
      "admin-products",
    ];

    if (typeof productId === "string") productKeys.push(`product-${productId}`);
    if (typeof productId === "object") {
      productId.forEach((i) => productKeys.push(`product-${i}`));
      console.log("lol");
    }
    myCache.del(productKeys);
  }

  if (order) {
    const orderKeys: string[] = [
      "all-orders",
      `my-orders-${userId}`,
      `order-${orderId}`,
    ];
    myCache.del(orderKeys);
  }
  const adminKeys: string[] = [];
};

export const reduceStock = async (orderItems: OrderItemType[]) => {
  for (let i = 0; i < orderItems.length; i++) {
    const order = orderItems[i];
    const product = await Product.findById(order.productId);
    if (!product) throw new Error("Product not found !");
    product.stock -= order.quantity;
    await product.save();
  }
};
