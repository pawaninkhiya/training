import { NextFunction, Request, Response } from "express";

export const errorMiddleWare = (
  err: Error,
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  return resp.status(400).json({
    succuss: true,
    message: "Some Error",
  });
};
