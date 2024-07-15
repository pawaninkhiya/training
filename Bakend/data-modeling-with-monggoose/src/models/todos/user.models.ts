import { Document, model, Schema } from "mongoose";

interface IUSer extends Document {
  username: string;
  email: string;
  password: number;
}
const userSchema = new Schema<IUSer>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: Number,
      // required: true,
      required: [true, "password is required"],
      min: 8,
      max: 10,
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUSer>("User", userSchema);
