import { Document } from "mongoose";
import { myCache } from "../controllers/product.controllers";

import { Product } from "../models/product.models";
import { InvaildateCacheProps, OrderItemType } from "../types/types";

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
      `product-${productId}`,
    ];

    if (typeof productId === "string") productKeys.push(`product-${productId}`);
    if (typeof productId === "object") {
      productId.forEach((i) => productKeys.push(`product-${i}`));
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

export const calculatePercentage = (thisMonth: number, lastMonth: number) => {
  if (lastMonth === 0) return thisMonth * 100;
  const percentage = ((thisMonth - lastMonth) / lastMonth) * 100;
  return Number(percentage.toFixed(0));
};
interface MyDocument extends Document {
  createdAt: Date;
}

type TypeFunc1 = {
  length: number;
  docArr: MyDocument[];
  today: Date;
};
export const getChartData = ({ length, docArr, today }: TypeFunc1) => {
  const data = new Array(6).fill(0);
  docArr.forEach((i: MyDocument) => {
    const creationDate = i.createdAt;
    const monthDiff = (today.getMonth() - creationDate.getMonth() + 12) % 12;
    if (monthDiff <= length) {
      data[6 - monthDiff - 1] += 1;
    }
  });
};
