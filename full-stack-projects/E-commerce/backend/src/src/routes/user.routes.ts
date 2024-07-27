import express from "express";
import { newUser } from "../controllers/user.controllers";

const router = express.Router();

router.post("/new", newUser);

export default router;
