import { User } from "../models/user.models";
import { ErrorHandler, TryCatch } from "../utils/errorHandler";

export const adminOnly = TryCatch(async (req, resp, next) => {
  const { _id } = req.query;
  if (!_id) return next(new ErrorHandler("Saale login kr phle", 401));
  const user = await User.findById(_id);
  if (!user) return next(new ErrorHandler("Saale Fake ID Deta hai", 401));
  if (user.role !== "admin") {
    return next(new ErrorHandler("Saale Aukaat nhi  teri", 401));
  }
  next();
});
