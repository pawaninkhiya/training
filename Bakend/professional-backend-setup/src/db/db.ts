import mongoose from "mongoose";
import { DB_NAME } from "../constants";
import config from "../config";

const connectDb = async () => {
  try {
    await mongoose.connect(`${config.MONGO_URI}/${DB_NAME}`);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed :", error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDb;
