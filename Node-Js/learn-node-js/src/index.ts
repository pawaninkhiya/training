import express, { Request, Response } from "express";
import { router } from "./routes/routes";
import connectMongoDb from "./config/db";
const app = express();
const PORT = 4011;

app.use("/", router)
app.get("/test", (req: Request, resp: Response) => {
    resp.json({ data: "test page 1" });
});
connectMongoDb()
app.listen(PORT, (): void => {
    console.log(`server is running on this port ${PORT}`);
});
