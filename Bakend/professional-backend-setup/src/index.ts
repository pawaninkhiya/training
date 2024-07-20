import express, { Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import config from "./config";
import connectDb from "./db/db";

const PORT = config.PORT;
const app: Express = express();

// Connect to MongoDB
connectDb();

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// import routes  routes
import userRouter from "./routes/user.routes";
import videoRouter from "./routes/video.routes";

// route declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/users", videoRouter);

// routes

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});