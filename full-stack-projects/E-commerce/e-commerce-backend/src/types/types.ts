import { Request, Response, NextFunction } from "express";
import { Interface } from "readline";
export type NewUserRequestBody = {
  _id: string;
  name: string;
  email: string;
  gender: string;
  dob: Date;
  photo: string;
};

export type NewProductRequest = {
  name: string;
  price: number;
  stock: number;
  category: string;
};
export type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;

export type SearchRequestQuery = {
  search?: string;
  price?: string;
  category?: string;
  sort?: string;
  page?: string;
};

export interface BaseQuery {
  name?: {
    $regex: string;
    $options: string;
  };
  price?: {
    $lte: number;
  };
  category?: string;
}

export interface InvaildateCacheProps {
  product?: boolean;
  order?: boolean;
  admin?: boolean;
}

// orders
export type OrderItemType = {
  name: string;
  photo: string;
  price: number;
  quantity: number;
  productId: string;
};
export type ShippingInfoType = {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: number;
};
export interface NewOrderRequestBody {
  shippingInfo: ShippingInfoType;
  user: string;
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  orderItems: OrderItemType[];
}
