import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { User } from "../models/user.models";
import { IUser } from "../models/user.models";
import uploadOnCloudinary from "../utils/cloudinary";
import ApiResponse from "../utils/EpiResponse";


const registerUser = asyncHandler(async (req: Request, resp: Response) => {
  const { username, email, fullName, password } = req.body;

  if ([username, email, fullName, password].some((field) => field.trim() === "")) {
    throw new ApiError(400, "All fields are required!");
  }

  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    return resp.status(400).json({
      success: false,
      message: "Username is already in use.",
    });
  }

  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    return resp.status(400).json({
      success: false,
      message: "Email is already in use.",
    });
  }

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  const avatarLocalPath = files.avatar?.[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  let coverImage = null;
  const coverImageLocalPath = files.coverImage?.[0]?.path;
  if (coverImageLocalPath) {
    coverImage = await uploadOnCloudinary(coverImageLocalPath);
  }

  const user: Partial<IUser> = await User.create({
    username,
    email,
    password,
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  const createdUser = await User.findById(user._id).select("-password -refreshToken");
  if (!createdUser) {
    throw new ApiError(400, "Something went wrong while registering the user!");
  }

  resp.status(201).json(new ApiResponse(200, createdUser, "User registered successfully"));
});

export { registerUser };


// import { Request, Response } from "express";
// import { asyncHandler } from "../utils/asyncHandler";
// import { Document, Query } from "mongoose";
// import { ApiError } from "../utils/ApiError";
// import { User } from "../models/user.models";
// import { IUser } from "../models/user.models";
// import uploadOnCloudinery from "../utils/cloudinary";
// import ApiResponse from "../utils/EpiResponse";

// const registerUser = asyncHandler(async (req: Request, resp: Response) => {
//   // Step 1 get user details from frontend
//   // Step 2 validation  atleast one - not empty
//   // Step 3 check user already exits  - check username and email
//   // Step 4 check for images  for avatar
//   // Step 5  upload them to cloudinaery
//   // Step 6 create-user object -entry  in db
//   // Setp 7 remove password  and refresh token filed from respone
//   // Step 8 check for user creation
//   // Step 9 return response

//   // Step 1 get user details from frontend

//   const { username, email, fullName, password } = req.body;

//   // Step 2 validation  atleast one - not empty

//   if (
//     [username, email, fullName, password].some((field) => field.trim() === "")
//   ) {
//     throw new ApiError(400, "All feild are required !! ");
//   }

//   // Step 3 check user already exits  - check username and email

//   const existingUsername: Query<
//     Document<IUser> | null,
//     Document<IUser>
//   > = User.findOne({ username });
//   if (await existingUsername) {
//     return resp.status(400).json({
//       success: false,
//       message: "Username is already in use.",
//     });
//   }

//   const existingEmail: Query<
//     Document<IUser> | null,
//     Document<IUser>
//   > = User.findOne({ email });
//   if (await existingEmail) {
//     return resp.status(400).json({
//       success: false,
//       message: "Email is already in use.",
//     });
//   }

//   // Step 4 check for images  for avatar
//   // Type casting req.files to the expected structure
//   const files = req.files as {
//     avatar?: Express.Multer.File[];
//     coverImage?: Express.Multer.File[];
//   };
//   const avatarLocalPath = files.avatar?.[0]?.path;
//   const coverImageLocalPath = files.coverImage?.[0]?.path;

//   if (!avatarLocalPath) {
//     throw new ApiError(400, "Avatar file is required");
//   }

//   // Step 5: Upload images to Cloudinary
//   const avatar = await uploadOnCloudinery(avatarLocalPath);
//   let coverImage = null;

//   if (coverImageLocalPath) {
//     coverImage = await uploadOnCloudinery(coverImageLocalPath);
//   }

//   // Step 6 create-user object -entry  in db
//   const user: Partial<IUser> = await User.create({
//     username,
//     email,
//     password,
//     fullName,
//     avatar: avatar.url,
//     coverImage: coverImage?.url || "",
//   });

//   // Setp 7 remove password  and refresh token filed from respone

//   const createdUser = await User.findById(user._id).select(
//     "-password -refreshToken"
//   );
//   // Step 8 check for user creation
//   if (!createdUser) {
//     throw new ApiError(
//       400,
//       "Something went wrong  while registering the user !"
//     );
//   }

//   // Step 9 return response
//   resp
//     .status(201)
//     .json(new ApiResponse(200, createdUser, "User register succussfully"));
// });

// export { registerUser };
