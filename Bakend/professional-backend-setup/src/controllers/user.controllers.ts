import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import uploadOnCloudinary from "../utils/cloudinary";
import ApiResponse from "../utils/EpiResponse";
import { IUser, User } from "../models/user.models";
import { FilterQuery, Types } from "mongoose";
import jwt, { JwtPayload } from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userId: unknown) => {
  try {
    const user = (await User.findById(userId)) as IUser;
    if (!user) {
      throw new ApiError(400, "User not found !!");
    }
    const accessToken: string = user.generateAccessToken();
    const refreshToken: string = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      400,
      "Something went while generating access refresh and access token "
    );
  }
};
const loginUser = asyncHandler(async (req: Request, resp: Response) => {
  const { email, username, password } = req.body;

  if (!username && !email) {
    throw new ApiError(400, "Username or email is required");
  }

  const filterQuery: FilterQuery<IUser> = { $or: [{ username }, { email }] };
  const user = await User.findOne(filterQuery);
  if (!user) {
    throw new ApiError(404, "User does not exists");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(400, "Invalid credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  resp
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: user, accessToken, refreshToken },
        "User logged in Succussfully"
      )
    );
});

const logoutUser = asyncHandler(async (req: Request, resp: Response) => {
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        refreshToken: null,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };
  return resp
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const refreshAccessToken = asyncHandler(
  async (req: Request, resp: Response) => {
    try {
      const incomingRefreshToken =
        req.cookies.refreshToken || req.body.refreshToken;

      if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request !");
      }

      let refreshTokenSecret: any = process.env.REFRESH_TOKEN_SECRE;
      if (!refreshAccessToken) {
        throw new ApiError(401, "Token secret is not defined !");
      }
      const decodedToken = jwt.verify(incomingRefreshToken, refreshTokenSecret);
      console.log(decodedToken);
      if (
        !decodedToken ||
        typeof decodedToken !== "object" ||
        !("_id" in decodedToken)
      ) {
        throw new ApiError(401, "Invalid Access Token");
      }
      const user = await User.findById(decodedToken?._id);
      if (!user) {
        throw new ApiError(401, "Invalid refresh token !");
      }
      if (incomingRefreshToken !== user?.refreshToken) {
        throw new ApiError(401, "Invalid refresh token");
      }
      const options = {
        httpOnly: true,
        secure: true,
      };
      const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
        user?._id
      );
      resp
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
          new ApiResponse(
            200,
            {
              accessToken: accessToken,
              newRefreshToken: refreshToken,
            },
            "Access token refreshed !"
          )
        );
    } catch (error) {
      throw new ApiError(401, "Invalid refresh token");
    }
  }
);

const registerUser = asyncHandler(async (req: Request, resp: Response) => {
  // step one
  const { username, email, fullName, password } = req.body;

  // step 2
  if (
    [username, email, fullName, password].some(
      (field) => !field || field === ""
    )
  ) {
    throw new ApiError(400, "All fields are required!");
  }

  // step 3
  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    throw new ApiError(400, "Username is already in use");
  }

  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    throw new ApiError(400, "Email is already in use");
  }

  //  step 4
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  const avatarLocalPath = files.avatar?.[0]?.path;

  let coverImageLocalPath: string = "";

  if (files && Array.isArray(files.coverImage) && files.coverImage.length > 0) {
    coverImageLocalPath = files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  const user: Partial<IUser> = await User.create({
    username,
    email,
    password,
    fullName,
    avatar: avatar?.url,
    coverImage: coverImage?.url || "",
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(400, "Something went wrong while registering the user!");
  }

  resp
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

const changeCurrentPassword = asyncHandler(
  async (req: Request, resp: Response) => {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user?._id);

    if (!user) {
      throw new ApiError(400, "User not found");
    }
    const isPasswordCorrect = await user.comparePassword(oldPassword);
    if (!isPasswordCorrect) {
      throw new ApiError(400, "Old password is incorrect");
    }
    user.password = newPassword;
    await user.save({ validateBeforeSave: false });
    resp
      .status(200)
      .json(new ApiResponse(200, {}, "Password changed successfully"));
  }
);

const getCurrentUser = asyncHandler(async (req: Request, resp: Response) => {
  // const { id } = req.params;
  // console.log(id);
  // const user = await User.findById(id).select("-password -refreshToken");
  // if (!user) {
  //   throw new ApiError(400, "User not found");
  // }
  const user = await User.findById(req.user?._id).select(
    "-password -refreshToken"
  );
  resp.status(200).json(new ApiResponse(200, user, "ok"));
});

const updateCurrentUser = asyncHandler(async (req: Request, resp: Response) => {
  const { username, fullName, email } = req.body;
  if (!username || !fullName || !email) {
    throw new ApiError(400, "All fields are required !");
  }
  const updatedUser = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: { fullName, email, username },
    },
    { new: true }
  ).select("-password");

  resp
    .status(200)
    .json(new ApiResponse(200, updatedUser, "User updated succussfully !"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateCurrentUser,
};

// const generateAccessAndRefreshToken = async (userId: unknown) => {
//   try {
//     const user = (await User.findById(userId)) as IUser;
//     if (!user) {
//       throw new ApiError(400, "User not found !!");
//     }
//     const accessToken: string = user.generateAccessToken();
//     const refreshToken: string = user.generateRefreshToken();
//     user.refreshToken = refreshToken;
//     await user.save({ validateBeforeSave: false });
//     return { accessToken, refreshToken };
//   } catch (error) {
//     throw new ApiError(
//       400,
//       "Something went while generating access refresh and access token "
//     );
//   }
// };
// const loginUser = asyncHandler(async (req: Request, resp: Response) => {
//   // resp body -> data
//   // username or email
//   // find the user
//   // password or check
//   // access and refresh  token
//   // send coookie

//   const { email, username, password } = req.body;

//   if (!username && !email) {
//     throw new ApiError(400, "Username or email is required");
//   }

//   const filterQuery: FilterQuery<IUser> = { $or: [{ username }, { email }] };
//   const user = await User.findOne(filterQuery);

//   if (!user) {
//     throw new ApiError(404, "User does not exists");
//   }
//   const isMatch = await user.comparePassword(password);
//   if (!isMatch) {
//     throw new ApiError(400, "Invalid credentials");
//   }
//   const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
//     user._id
//   );

//   const loggedUser = await User.findById(user._id).select(
//     "-password -refreshToken"
//   );
//   const options = {
//     httpOnly: true,
//     secure: true,
//   };
//   resp
//     .status(200)
//     .cookie("accessToken", accessToken, options)
//     .cookie("refreshToken", refreshToken, options)
//     .json(
//       new ApiResponse(
//         200,
//         { user: user, accessToken, refreshToken },
//         "User logged in Succussfully"
//       )
//     );
// });

// const logoutUser = asyncHandler(async (req: Request, resp: Response) => {
//   // remove cookie
//   // remove refresh token from db
//   // send 200

//   await User.findByIdAndUpdate(
//     req.user?._id,
//     {
//       $set: {
//         refreshToken: null,
//       },
//     },
//     {
//       new: true,
//     }
//   );

//   const options = {
//     httpOnly: true,
//     secure: true,
//   };
//   return resp
//     .status(200)
//     .clearCookie("accessToken", options)
//     .clearCookie("refreshToken", options)
//     .json(new ApiResponse(200, {}, "User logged out successfully"));
// });

// const registerUser = asyncHandler(async (req: Request, resp: Response) => {
//   // step one
//   const { username, email, fullName, password } = req.body;

//   // step 2
//   if (
//     [username, email, fullName, password].some(
//       (field) => !field || field === ""
//     )
//   ) {
//     throw new ApiError(400, "All fields are required!");
//   }

//   // step 3
//   const existingUsername = await User.findOne({ username });
//   if (existingUsername) {
//     throw new ApiError(400, "Username is already in use");
//   }

//   const existingEmail = await User.findOne({ email });
//   if (existingEmail) {
//     throw new ApiError(400, "Email is already in use");
//   }

//   //  step 4
//   const files = req.files as { [fieldname: string]: Express.Multer.File[] };

//   const avatarLocalPath = files.avatar?.[0]?.path;

//   let coverImageLocalPath: string = "";

//   if (files && Array.isArray(files.coverImage) && files.coverImage.length > 0) {
//     coverImageLocalPath = files.coverImage[0].path;
//   }

//   if (!avatarLocalPath) {
//     throw new ApiError(400, "Avatar file is required");
//   }
//   const avatar = await uploadOnCloudinary(avatarLocalPath);
//   const coverImage = await uploadOnCloudinary(coverImageLocalPath);

//   const user: Partial<IUser> = await User.create({
//     username,
//     email,
//     password,
//     fullName,
//     avatar: avatar?.url,
//     coverImage: coverImage?.url || "",
//   });

//   const createdUser = await User.findById(user._id).select(
//     "-password -refreshToken"
//   );
//   if (!createdUser) {
//     throw new ApiError(400, "Something went wrong while registering the user!");
//   }

//   resp
//     .status(201)
//     .json(new ApiResponse(200, createdUser, "User registered successfully"));
// });

// export { registerUser, loginUser, logoutUser };

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
