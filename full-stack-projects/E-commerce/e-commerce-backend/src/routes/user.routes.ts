import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  newUser,
} from "../controllers/user.controllers";
import { adminOnly } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/new", newUser);
router.get("/all", adminOnly, getAllUsers);

router.route("/:_id").get(getUser).get(getUser).delete(adminOnly, deleteUser);


export default router;
