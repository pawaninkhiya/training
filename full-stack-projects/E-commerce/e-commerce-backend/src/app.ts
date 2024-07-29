import express from "express";

import userRoutes from "./routes/user.routes";
import productRoutes from "./routes/product.routes";
import { errorMiddleware } from "./middlewares/errors.middleware";
import { connectDB } from "./db/db";

const port = 3000;
connectDB();
const app = express();

// middleware
app.use(express.json());

// user routes
app.use("/api/user/v1", userRoutes);
app.use("/api/product/v1", productRoutes);

app.use(errorMiddleware);
app.use("/uploads", express.static("uploads"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
