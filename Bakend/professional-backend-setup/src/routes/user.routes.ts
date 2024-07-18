import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controllers";
import { upload } from "../middlewares/multer.middleware";
// import multer from "multer";
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

export default router;
