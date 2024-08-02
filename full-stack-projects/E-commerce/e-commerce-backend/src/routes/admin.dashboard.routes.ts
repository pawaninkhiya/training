import express from "express";
import { adminOnly } from "../middlewares/auth.middleware";
import {
  getBarCharts,
  getDashboardStats,
  getLineCharts,
  getPieCharts,
} from "../controllers/admin.dashboard.controllers";
const router = express.Router();

// http://localhost:4000/api/v1/dashboard/stats
router.get("/stats", getDashboardStats);
// http://localhost:4000/api/v1/dashboard/pie
router.get("/pie", getPieCharts);
// http://localhost:4000/api/v1/dashboard/bar
router.get("/bar", getBarCharts);
// http://localhost:4000/api/v1/dashboard/line
router.get("/line", adminOnly, getLineCharts);

export default router;
