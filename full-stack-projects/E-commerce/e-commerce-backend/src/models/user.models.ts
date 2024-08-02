import mongoose, { Document, Schema } from "mongoose";
import validator from "validator";

interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  photo: string;
  role: "admin" | "user";
  gender: "male" | "female";
  dob: Date;
  age: number;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    _id: {
      type: String,
      required: [true, "Please enter your Id"],
    },
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      validate: {
        validator: (email: string) => validator.isEmail(email),
        message: "Please enter a valid email",
      },
    },
    photo: {
      type: String,
      required: [true, "Please enter your photo"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Please enter your gender"],
    },
    dob: {
      type: Date,
      required: [true, "Please enter Date of birth"],
    },
  },
  { timestamps: true }
);

userSchema.virtual("age").get(function () {
  const today = new Date();
  const birthDate = new Date(this.dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
});

export const User = mongoose.model<IUser>("User", userSchema);
