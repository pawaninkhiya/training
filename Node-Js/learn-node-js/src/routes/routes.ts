import express, { Request, Response } from "express";
import { json } from "stream/consumers";
import { getHomeDetail } from "../controllers/user.controllers";
const router = express.Router();


// router.get("/home", (req: Request, resp: Response) => {
//     resp.json({ message: "Hello From Homen Page" });
// });

router.get("/home", getHomeDetail);
// router.get("/about", getAboutDetail);
export { router };
