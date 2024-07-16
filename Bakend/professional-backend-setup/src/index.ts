import express, { Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import config from "./config";
import connectDb from "./db/db";

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

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
