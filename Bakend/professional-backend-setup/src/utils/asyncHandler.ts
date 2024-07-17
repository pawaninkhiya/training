import { Request, Response, NextFunction } from "express";

type AsyncHandler = (
  req: Request,
  resp: Response,
  next: NextFunction
) => Promise<any>;

const asyncHandler =
  (func: AsyncHandler) =>
  (req: Request, resp: Response, next: NextFunction) => {
    Promise.resolve(func(req, resp, next)).catch((err) => next(err));
  };

// const asyncHandler =
//   (func: AsyncHandler) =>
//   async (req: Request, resp: Response, next: NextFunction) => {
//     try {
//       await func(req, resp, next);
//     } catch (error: any) {
//       resp.status(error.code || 500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   };

export { asyncHandler };
