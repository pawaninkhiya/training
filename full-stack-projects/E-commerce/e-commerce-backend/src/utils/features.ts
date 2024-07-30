import { myCache } from "../controllers/product.controllers";
import { Order } from "../models/order.models";
import { Product } from "../models/product.models";
import { InvaildateCacheProps, OrderItemType } from "../types/types";
import { ErrorHandler } from "./errorHandler";

export const invaildateCache = async ({
  product,
  admin,
  order,
}: InvaildateCacheProps) => {
  const productKeys: string[] = [
    "latest-product",
    "categories",
    "admin-products",
  ];
  const productIds = await Product.find({}).select("_id");
  productIds.forEach((i) => {
    productKeys.push(`product-${i._id}`);
  });
  const adminKeys: string[] = [];
  const orderKeys: string[] = [];
  if (product) {
    myCache.del(productKeys);
  }
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
