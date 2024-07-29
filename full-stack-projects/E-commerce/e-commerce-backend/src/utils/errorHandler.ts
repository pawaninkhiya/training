import { ControllerType } from "../types/types";
import { Request, Response, NextFunction } from 'express'
export  class ErrorHandler extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const TryCatch = (func: ControllerType) => (req: Request, resp: Response, next: NextFunction) => {
  return Promise.resolve(func(req, resp, next)).catch(next)
};
