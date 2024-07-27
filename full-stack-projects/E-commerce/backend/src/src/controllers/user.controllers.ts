import { Request, Response, NextFunction } from "express";
import { NewUserRequestBody } from "../types/types";
import { User } from "../models/user.models";

const newUser = async (
  req: Request<{}, {}, NewUserRequestBody>,
  resp: Response,
  next: NextFunction
) => {
  try {
    // return next();
    const { _id, name, email, gender, dob, photo } = req.body;

    const user = await User.create({
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
  } catch (error) {
    console.log(error);
    return resp.status(500).json({ succuss: 400, message: error });
  }
};

export { newUser };
