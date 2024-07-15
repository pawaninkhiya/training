import { Schema, model ,Document} from "mongoose";

interface IUser  extends Document{
  username: string;
  email: string;
  password: number;
}
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
export const User = model<IUser>("User", userSchema);
