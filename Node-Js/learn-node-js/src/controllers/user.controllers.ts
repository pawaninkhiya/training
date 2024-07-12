import { Request, Response } from "express";
import UserModel from "../models/user.models";
import {
  createUser,
  findUser,
  updateUser,
  deleteUser,
} from "../services/user.service";
export const getHomeDetail = async (req: Request, resp: Response) => {
  // create User

  // let user = await createUser({
  //   name: "Ankit Kumat",
  //   description: "Hello everyone "
  // });

  // update user
  // let newUpdated = await updateUser(
  //   {
  //     name: "Pawan Kumat",
  //   },
  //   {
  //     name:"Pawan Kumar",
  //     description: "Hello New how are you",
  //   },
  //   { new: true }
  // );

  // find one user
  // let user = await findUser({_id:"668fd1a5e45f4a0ecb63defb"})

  // delete user
  let deletedUser = await deleteUser({ _id: "6690a8664db1e088d27bcf80" });
  
  // let myData = await UserModel.find();
  // resp.json({ message: "Home Page", data: user });
  resp.json({ message: "User Deleted Succusfully", data: deletedUser });
};

export const find = (req: Request, resp: Response) => {
  resp.json({ message: "About Page" });
};
