import { Order } from "../models/order.models";
import { Product } from "../models/product.models";
import { User } from "../models/user.models";
import { TryCatch } from "../utils/errorHandler";
import { calculatePercentage } from "../utils/features";
import { myCache } from "./product.controllers";

const getDashboardStats = TryCatch(async (req, resp, next) => {
  let stats = {};

  if (myCache.has("dashboard-stats")) {
    stats = JSON.parse(myCache.get("dashboard-stats") as string);
  } else {
    const today = new Date();

    const thisMonth = {
      start: new Date(today.getFullYear(), today.getMonth(), 1),
      end: today,
    };
    const lastMonth = {
      start: new Date(today.getFullYear(), today.getMonth() - 1, 1),
      end: new Date(today.getFullYear(), today.getMonth() - 1, 0),
    };

    const thisMonthProductsPromise = Product.find({
      createdAt: {
        $gte: thisMonth.start,
        $lte: thisMonth.end,
      },
    });
    const lastMonthProductsPromise = Product.find({
      createdAt: {
        $gte: lastMonth.start,
        $lte: lastMonth.end,
      },
    });
    const thisMonthUsersPromise = User.find({
      createdAt: {
        $gte: thisMonth.start,
        $lte: thisMonth.end,
      },
    });
    const lastMonthUsersPromise = User.find({
      createdAt: {
        $gte: lastMonth.start,
        $lte: lastMonth.end,
      },
    });
    const thisMonthOrdersPromise = Order.find({
      createdAt: {
        $gte: thisMonth.start,
        $lte: thisMonth.end,
      },
    });
    const lastMonthOrdersPromise = Order.find({
      createdAt: {
        $gte: lastMonth.start,
        $lte: lastMonth.end,
      },
    });

    const [
      thisMonthProducts,
      lastMonthProducts,
      thisMonthUsers,
      lastMonthUsers,
      thisMonthOrders,
      lastMonthOrders,
    ] = await Promise.all([
      thisMonthProductsPromise,
      lastMonthProductsPromise,
      thisMonthUsersPromise,
      lastMonthUsersPromise,
      thisMonthOrdersPromise,
      lastMonthOrdersPromise,
    ]);

    const productChangePercent = calculatePercentage(
      thisMonthProducts.length,
      lastMonthProducts.length
    );
    const userChangePercent = calculatePercentage(
      thisMonthUsers.length,
      lastMonthUsers.length
    );

    const ordersChangeParcent = calculatePercentage(
      thisMonthOrders.length,
      lastMonthOrders.length
    );

    stats = {
      productChangePercent,
      userChangePercent,
      ordersChangeParcent,
    };
  }

  resp.status(200).json({
    succuss: true,
    message: "Stats fetched succussfully ",
    data: stats,
  });
});
const getPieCharts = TryCatch(async (req, resp, next) => {});
const getBarCharts = TryCatch(async (req, resp, next) => {});
const getLineCharts = TryCatch(async (req, resp, next) => {});

export { getDashboardStats, getPieCharts, getBarCharts, getLineCharts };
