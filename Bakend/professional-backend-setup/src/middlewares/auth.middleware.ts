import { IUser, User } from "../models/user.models";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const verifyJWT = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");
      if (!token) {
        throw new ApiError(401, "Unauthorized request");
      }

      const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
      if (!accessTokenSecret) {
        throw new ApiError(500, "Token secret is not defined");
      }
     
      const decodedJwt = jwt.verify(token, accessTokenSecret);
      
      if (!decodedJwt || typeof decodedJwt !== 'object' || !('_id' in decodedJwt)) {
        throw new ApiError(401, "Invalid Access Token");
      }

        const user = await User.findById((decodedJwt as { _id: string })._id).select("-password -refreshToken");
        if (!user) {
          throw new ApiError(401, "Invalid Access Token");
        }
      req.user = user
      next();
    } catch (error) {
      throw new ApiError(401, "Invalid Access Token");
    }
  }
);
