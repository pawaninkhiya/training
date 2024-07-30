import express from "express";

import userRoutes from "./routes/user.routes";
import productRoutes from "./routes/product.routes";
import orderRoutes from "./routes/order.routes";
import { errorMiddleware } from "./middlewares/errors.middleware";
import { connectDB } from "./db/db";
import { config } from "dotenv";
import morgan from "morgan"

config({
  path: "./.env",
});

const port = process.env.PORT || 3000;
const mongo_uri = process.env.MONGO_URI || "";
connectDB(mongo_uri);
const app = express();

// middleware
app.use(express.json());
app.use(morgan('dev'));

// app.use(FormData.parser());

// user routes
app.use("/api/user/v1", userRoutes);
app.use("/api/product/v1", productRoutes);
app.use("/api/order/v1", orderRoutes);

app.use(errorMiddleware);
app.use("/uploads", express.static("uploads"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
