import { Order } from "../models/order.models";
import { Product } from "../models/product.models";
import { User } from "../models/user.models";
import { TryCatch } from "../utils/errorHandler";
import { calculatePercentage, getChartData } from "../utils/features";
import { myCache } from "./product.controllers";

const getDashboardStats = TryCatch(async (req, resp, next) => {
  let stats = {};
  const key = "dashboard-stats";

  if (myCache.has(key)) {
    stats = JSON.parse(myCache.get(key) as string);
    const sixMonthAgo = new Date();

    sixMonthAgo.setMonth(sixMonthAgo.getMonth() - 6);
    console.log(sixMonthAgo);
  } else {
    const today = new Date();
    const sixMonthAgo = new Date();

    sixMonthAgo.setMonth(sixMonthAgo.getMonth() - 6);
    console.log(sixMonthAgo);

    const thisMonth = {
      start: new Date(today.getFullYear(), today.getMonth(), 1),
      end: today,
    };
    const lastMonth = {
      start: new Date(today.getFullYear(), today.getMonth() - 1, 1),
      end: new Date(today.getFullYear(), today.getMonth(), 0),
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
    const lastSixMonthOrdersPromise = Order.find({
      createdAt: {
        $gte: sixMonthAgo,
        $lte: today,
      },
    });
    const latestTransactionsPromise = Order.find({})
      .select(["orderItems", "discount", "total", "status"])
      .limit(4);
    const [
      thisMonthProducts,
      lastMonthProducts,
      thisMonthUsers,
      lastMonthUsers,
      thisMonthOrders,
      lastMonthOrders,
      productCount,
      userCount,
      allOrders,
      lastSixMonthOrders,
      categories,
      femaleUserCount,
      latestTransactions,
    ] = await Promise.all([
      thisMonthProductsPromise,
      lastMonthProductsPromise,
      thisMonthUsersPromise,
      lastMonthUsersPromise,
      thisMonthOrdersPromise,
      lastMonthOrdersPromise,
      Product.countDocuments(),
      User.countDocuments(),
      Order.find({}).select("total"),
      lastSixMonthOrdersPromise,
      Product.distinct("category"),
      User.countDocuments({ gander: "female" }),
      latestTransactionsPromise,
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

    const revenue = allOrders.reduce(
      (total, order) => total + (order.total || 0),
      0
    );

    const changePercent = {
      product: productChangePercent,
      user: userChangePercent,
      ordersChangeParcent,
    };
    const counts = {
      revenue,
      user: userCount,
      product: productCount,
      order: allOrders.length,
    };

    const orderMonthCounts = new Array(6).fill(0);
    const orderMonthRevenue = new Array(6).fill(0);
    lastSixMonthOrders.forEach((order) => {
      const creationDate = order.createdAt;
      const monthDiff = (today.getMonth() - creationDate.getMonth() + 12) % 12;
      if (monthDiff <= 6) {
        orderMonthCounts[6 - monthDiff - 1] += 1;
        orderMonthRevenue[6 - monthDiff - 1] += order.total || 0;
      }
    });

    const categoriesCountPromise = categories.map((category) =>
      Product.countDocuments({ category })
    );

    const categoriesCount = await Promise.all(categoriesCountPromise);
    const categoryCount: Record<string, number>[] = [];
    console.log(categories);
    categories.forEach((category, i) => {
      categoryCount.push({
        [category]: Math.round((categoriesCount[i] / productCount) * 100),
      });
    });

    const userRatio = {
      userCount: userCount - femaleUserCount,
      femaleCount: femaleUserCount,
    };
    const modifiedTransactions = latestTransactions.map((item, i) => {
      return {
        id: item._id,
        discount: item.discount,
        price: item.total,
        quantity: item.orderItems.length,
        status: item.status,
      };
    });
    stats = {
      categoryCount,
      changePercent,
      counts,
      charts: {
        orderMonthCounts,
        orderMonthRevenue,
      },
      userRatio,
      latestTransactions: modifiedTransactions,
    };
    myCache.set(key, JSON.stringify(stats));
  }

  resp.status(200).json({
    succuss: true,
    message: "Stats fetched succussfully ",
    data: stats,
  });
});

const getPieCharts = TryCatch(async (req, resp, next) => {
  let charts;
  const key = "admin-pie-charts";
  if (myCache.has(key)) {
    charts = JSON.parse(myCache.get(key) as string);
  } else {
    const allOrdersPromise = await Order.find({}).select([
      "total",
      "discount",
      "subtotal",
      "tax",
      "shippingCharges",
      "age",
    ]);
    const [
      orderProcessingCount,
      orderShippedCount,
      orderDeliveredCount,
      categories,
      productCount,
      productOutOfStock,
      allOrders,
      allUsers,
      adminUsers,
      customerUsers,
    ] = await Promise.all([
      Order.countDocuments({ status: "Processing" }),
      Order.countDocuments({ status: "Shipped" }),
      Order.countDocuments({ status: "Delivered" }),
      Product.distinct("category"),
      Product.countDocuments(),
      Product.countDocuments({ stock: 0 }),
      allOrdersPromise,
      User.find({}).select("dob"),
      User.countDocuments({ role: "admin" }),
      User.countDocuments({ role: "user" }),
    ]);

    const orderFullfilemnt = {
      processing: orderProcessingCount,
      shipped: orderShippedCount,
      delivered: orderDeliveredCount,
    };

    const categoriesCountPromise = categories.map((category) =>
      Product.countDocuments({ category })
    );

    const categoriesCount = await Promise.all(categoriesCountPromise);
    const categoryCount: Record<string, number>[] = [];
    categories.forEach((category, i) => {
      categoryCount.push({
        [category]: Math.round((categoriesCount[i] / productCount) * 100),
      });
    });

    const stockAvailablity = {
      inStock: productCount - productOutOfStock,
      productOutOfStock,
    };
    const grossIncome = allOrders.reduce(
      (prev, order) => prev + (order.total || 0),
      0
    );
    const discount = allOrders.reduce(
      (prev, order) => prev + (order.discount || 0),
      0
    );
    const productionCost = allOrders.reduce(
      (prev, order) => prev + (order.shippingCharges || 0),
      0
    );
    const burnt = allOrders.reduce((prev, order) => prev + (order.tax || 0), 0);
    const marketingCost = Math.round(grossIncome * (30 / 100));

    const netMargin: number = discount - productionCost - burnt - marketingCost;

    const revenueDistribution = {
      netMargin,
      discount,
      productionCost,
      burnt,
      marketingCost,
    };

    const userAgeGroup = {
      teen: allUsers.filter((i) => i.age < 20).length,
      adult: allUsers.filter((i) => i.age >= 20 && i.age < 40).length,
      old: allUsers.filter((i) => i.age >= 40).length,
    };

    const adminCustomer = {
      admin: adminUsers,
      customer: customerUsers,
    };
    charts = {
      orderFullfilemnt,
      productCategories: categoryCount,
      stockAvailablity,
      allOrders,
      revenueDistribution,
      userAgeGroup,
      adminCustomer,
    };
  }
  myCache.set(key, JSON.stringify(charts));

  return resp.status(200).json({
    success: true,
    message: "Pie charts fetched successfully",
    data: charts,
  });
});

const getBarCharts = TryCatch(async (req, resp, next) => {
  let bar;
  const key = "admin-bar-charts";
  if (myCache.has(key)) {
    bar = JSON.parse(myCache.get(key) as string);
  } else {
    const today = new Date();
    const sixMonthAgo = new Date();
    sixMonthAgo.setMonth(sixMonthAgo.getMonth() - 12);
    const tewlveMonthAgo = new Date();
    tewlveMonthAgo.setMonth(tewlveMonthAgo.getMonth() - 12);

    const lastSixMonthProductPromise = Product.find({
      createdAt: {
        $gte: sixMonthAgo,
        $lte: today,
      },
    });
    const lastSixMonthUserPromise = Product.find({
      createdAt: {
        $gte: sixMonthAgo,
        $lte: today,
      },
    });
    const twelveMonthUserPromise = Product.find({
      createdAt: {
        $gte: tewlveMonthAgo,
        $lte: today,
      },
    });

    const [product, user, orders] = await Promise.all([
      lastSixMonthProductPromise,
      lastSixMonthUserPromise,
      twelveMonthUserPromise,
    ]);

    const productCounts = getChartData({ length: 6, today, docArr :product });

    const bar = {
      product,
      user,
      orders,
    };
    myCache.set(key, JSON.stringify(bar));
  }

  return resp.status(200).json({
    success: true,
    message: "Bar charts fetched successfully",
    data: bar,
  });
});

const getLineCharts = TryCatch(async (req, resp, next) => {});

export { getDashboardStats, getPieCharts, getBarCharts, getLineCharts };
