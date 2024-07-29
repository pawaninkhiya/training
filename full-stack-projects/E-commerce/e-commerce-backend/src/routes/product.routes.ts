import express from "express";
import { uplaodSingle } from "../middlewares/multer.middleware";
import { adminOnly } from "../middlewares/auth.middleware";
import {
  getAllCategories,
  getLatestProduts,
  newProduct,
  getAdminProducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/product.controllers";

const router = express.Router();

router.post("/new", uplaodSingle, newProduct);
router.get("/latest", getLatestProduts);
router.get("/categories", getAllCategories);
router.get("/admin_products", getAdminProducts);
router.route("/:id").get(getSingleProduct).put(updateProduct);
export default router;
