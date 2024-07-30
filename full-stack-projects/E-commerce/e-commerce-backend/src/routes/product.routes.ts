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
  getAllProducts
} from "../controllers/product.controllers";

const router = express.Router();

router.post("/new", uplaodSingle, newProduct);
router.get("/all", getAllProducts);
router.get("/latest", getLatestProduts);
router.get("/categories", getAllCategories);
router.get("/admin_products", getAdminProducts);
router.route("/:id").get(getSingleProduct).put(uplaodSingle, updateProduct);
export default router;