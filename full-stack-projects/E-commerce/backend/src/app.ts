import express, { Request, Response, NextFunction } from "express";

import useRoutes from "./src/routes/user.routes";
import { connectDB } from "./src/db/db";
import { errorMiddleWare } from "./src/middlewares/errors.middleware";

const port = 3000;
connectDB();
const app = express();

// middleware
app.use(express.json());

// user routes
app.use("/api/user/v1", useRoutes);

// app.use();
app.get("/", (req, resp) => {
  resp.send({
    name: "hello",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
