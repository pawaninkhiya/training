import mongoose, { Schema, Document, Types } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const accessTokenSecret: string = process.env.ACCESS_TOKEN_SECRET || "defaultAccessTokenSecret";
const accessTokenExpiry: string = process.env.ACCESS_TOKEN_EXPIRY || "1d";
const accessRefreshSecret: string = process.env.REFRESH_TOKEN_SECRET || "defaultRefreshTokenSecret";
const accessRefreshExpiry: string = process.env.REFRESH_TOKEN_EXPIRY || "10d";
export interface IUser extends Document {
  watchHistory: Types.ObjectId[];
  username: string;
  email: string;
  fullName: string;
  avatar: string;
  coverImage: string;
  password: string;
  refreshToken?: string; // Optional field
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    avatar: {
      type: String, // Cloudinary URL
      required: true,
    },
    coverImage: {
      type: String, // Cloudinary URL
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// Hash password before saving

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  let hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

// Add comparePassword method to user schema
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

// generate access token
userSchema.methods.generateAccessToken = function (): string {
  const payload = {
    _id: this._id,
    email: this.email,
    username: this.username,
    fullName: this.fullName,
  };

  return jwt.sign(payload, accessTokenSecret, { expiresIn: accessTokenExpiry });
};

// generate refresh token

userSchema.methods.generateRefreshToken = function (): string {
  const payload = {
    _id: this._id,
    email: this.email,
    username: this.username,
    fullName: this.fullName,
  };
  return jwt.sign(payload, accessRefreshSecret, {
    expiresIn: accessRefreshExpiry,
  });
};
export const User = mongoose.model<IUser>("User", userSchema);
