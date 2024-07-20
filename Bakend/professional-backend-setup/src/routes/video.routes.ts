import { getAllVideos, publishVideo } from "../controllers/video.controllers";
import { verifyJWT } from "../middlewares/auth.middleware";
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware";

const router = Router();

router.use(verifyJWT);
  
router
  .route("/")
  .get(getAllVideos)
  .post(
    upload.fields([
      { name: "videoFile", maxCount: 1 },
      { name: "thumbnail", maxCount: 1 },
    ]),
    publishVideo
  );

export default router;
