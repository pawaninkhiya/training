import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateCurrentUser
} from "../controllers/user.controllers";
import { upload } from "../middlewares/multer.middleware";
import { verifyJWT } from "../middlewares/auth.middleware";
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
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT,changeCurrentPassword);
// router.route("/get-user/:id").get(verifyJWT,getCurrentUser);
router.route("/get-user").get(verifyJWT,getCurrentUser);
router.route("/update-current-user").put(verifyJWT,updateCurrentUser);

export default router;
