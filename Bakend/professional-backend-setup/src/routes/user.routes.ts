import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateCurrentUser,
  updateUserAvatar,
  updateUserCoverImage,
  getWatchHistory,
  getUserChannel
  // deleteCurrentUser
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

router.route("/refresh-token").post(refreshAccessToken);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/user").get(verifyJWT, getCurrentUser);
router.route("/user").put(verifyJWT, updateCurrentUser);
router.route("/avatar").put(upload.single("avatar"), verifyJWT, updateUserAvatar);
router.route("/coverImage").put(upload.single("coverImage"), verifyJWT, updateUserCoverImage);
router.route("/user-channels/:username").get(verifyJWT,getUserChannel)
router.route("/watchHistory").get(verifyJWT,getWatchHistory)

// router.route("/delete-current-user").delete(deleteCurrentUser);

export default router;
