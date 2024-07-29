import { Request, Response, NextFunction } from "express";
import { NewUserRequestBody } from "../types/types";
import { User } from "../models/user.models";
import { TryCatch, ErrorHandler } from "../utils/errorHandler";

const newUser = TryCatch(
  async (
    req: Request<{}, {}, NewUserRequestBody>,
    resp: Response,
    next: NextFunction
  ) => {
    const { _id, name, email, gender, dob, photo } = req.body;

    let user = await User.findById({ _id });
    if (user) {
      return resp.status(200).json({
        succuss: true,
        message: `Welcome ${user.name}`,
      });
    }
    if (!_id || !name || !email || !gender || !dob || !photo) {
      return next(new ErrorHandler("All enter all field", 400));
    }
    user = await User.create({
      _id,
      name,
      email,
      photo,
      gender,
      dob,
    });

    return resp.status(201).json({
      succuss: true,
      message: `Welcome ${user.name}`,
    });
  }
);

const getAllUsers = TryCatch(async (req, resp, next) => {
  const users = await User.find({}).select("-password");
  if (users.length === 0) {
    return next(new ErrorHandler("No users found", 404));
  }
  return resp.status(200).json({
    status: 200,
    success: true,
    data: users,
  });
});

const getUser = TryCatch(async (req, resp, next) => {
  const { _id } = req.params;

  const user = await User.findById({ _id }).select("-password");
  if (!user?._id) {
    return next(new ErrorHandler("Invalid Id", 400));
  }

  return resp.status(200).json({
    status: 200,
    message: "User fetched succussfully !",
    data: user,
  });
});

const deleteUser = TryCatch(async (req, resp, next) => {
  const { _id } = req.params;
  const user = await User.findById(_id);
  if (!user) {
    return next(new ErrorHandler("Invalid Id", 400));
  }

  await user.deleteOne();

  return resp.status(200).json({
    succuss: true,
    message: "User deleted successfully",
  });
});



export { newUser, getAllUsers, getUser, deleteUser };
