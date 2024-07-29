import { Request, Response, NextFunction } from "express";
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
