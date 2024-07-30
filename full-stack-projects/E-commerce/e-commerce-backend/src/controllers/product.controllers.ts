import { rm } from "fs";
import { Product } from "../models/product.models";
import {
  BaseQuery,
  NewProductRequest,
  SearchRequestQuery,
} from "../types/types";
import { ErrorHandler, TryCatch } from "../utils/errorHandler";
import { Request, Response, NextFunction } from "express";
import { faker } from "@faker-js/faker";
import NodeCache from "node-cache";
import { invaildateCache } from "../utils/features";

export const myCache = new NodeCache();

const getLatestProduts = TryCatch(async (req, resp, next) => {
  let products;
  if (myCache.has("latest-product")) {
    products = JSON.parse(myCache.get("latest-product") as string);
  } else {
    const product = await Product.find({}).sort({ createdAt: -1 }).limit(5);
    myCache.set("latest-product", JSON.stringify(product));
  }
  return resp.status(200).json({
    status: 200,
    message: "Product fetched succussfully !",
    data: products,
  });
});

const getAllCategories = TryCatch(async (req, resp, next) => {
  let categories;
  if (myCache.has("categories")) {
    categories = JSON.parse(myCache.get("categories") as string);
  } else {
    const categories = await Product.distinct("category");
    myCache.set("categories", JSON.stringify(categories));
  }
  return resp.status(200).json({
    status: 200,
    message: "Categories fetched succussfully !",
    data: categories,
  });
});

const getAdminProducts = TryCatch(async (req, resp, next) => {
  let products;
  if (myCache.has("admin-products")) {
    products = JSON.parse(myCache.get("admin-products") as string);
  } else {
    const products = await Product.find({});
    myCache.set("admin-products", JSON.stringify(products));
  }
  return resp.status(200).json({
    status: 200,
    message: "Products fetched succussfully !",
    data: products,
  });
});

const getSingleProduct = TryCatch(async (req, resp, next) => {
  let product;
  const { id } = req.params;
  if (myCache.has(`prduct-{id}`)) {
    product = JSON.parse(myCache.get(`product-${id}`) as string);
  } else {
    product = await Product.findById(id);
    myCache.set(`product-${id}`, JSON.stringify(product));
  }
  return resp.status(200).json({
    status: 200,
    message: "Product fatech sucussfully",
    data: product,
    succuss: true,
  });
});

const updateProduct = TryCatch(async (req, resp, next) => {
  const { id } = req.params;
  const { name, price, stock, category } = req.body;
  const file = req.file;

  if (!id) return next(new ErrorHandler("Product ID is required", 400));

  const product = await Product.findById(id);

  if (!product) return next(new ErrorHandler("Product not found", 404));

  if (file) {
    rm(product.photo, () => {
      console.log("Old photo deleted");
    });
    product.photo = file.path;
  }
  if (name) {
    product.name = name;
  }
  if (price) {
    product.price = price;
  }
  if (stock) {
    product.stock = stock;
  }
  if (category) {
    product.category = category;
  }

  console.log("Updated Product:", product);
  const pro = await product.save();

  return resp.status(200).json({
    status: 200,
    success: true,
    message: "Product updated successfully",
    data: pro,
  });
});

const getAllProducts = TryCatch(
  async (
    req: Request<{}, {}, {}, SearchRequestQuery>,
    resp: Response,
    next: NextFunction
  ) => {
    const { search, category, price, sort } = req.query;
    const page = Number(req.query.page);
    const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
    const sikp = (page - 1) * limit;

    const baseQuery: BaseQuery = {};
    if (search) {
      baseQuery.name = {
        $regex: search,
        $options: "i",
      };
    }
    if (price) {
      baseQuery.price = {
        $lte: Number(price),
      };
    }
    if (category) {
      baseQuery.category = category;
    }

    const productPromise = Product.find(baseQuery)
      .sort(
        sort && {
          price: sort === "asc" ? 1 : -1,
        }
      )
      .limit(limit)
      .skip(sikp);

    const [products, filteredOnlyProduct] = await Promise.all([
      productPromise,
      Product.find(baseQuery),
    ]);

    const totalPage = Math.ceil(filteredOnlyProduct.length / limit);
    resp.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products,
      totalPage,
    });
  }
);

const generateRandomProducts = async (count: number = 0): Promise<void> => {
  const products = [];

  for (let i = 0; i < count; i++) {
    const product = {
      name: faker.commerce.productName(),
      photo: "uploads\\a1c5e160-b462-48fd-9cfb-e5b24eff9c7f.png",
      price: parseInt(faker.commerce.price({ min: 1500, max: 80000, dec: 0 })),
      stock: parseInt(faker.commerce.price({ min: 0, max: 100, dec: 0 })),
      category: faker.commerce.department(),
      createdAt: new Date(faker.date.past()),
      updatedAt: new Date(faker.date.past()),
    };

    products.push(product);
  }

  await Product.insertMany(products);
  console.log({ success: true });
};
const newProduct = TryCatch(
  async (
    req: Request<{}, {}, NewProductRequest>,
    resp: Response,
    next: NextFunction
  ) => {
    const { name, price, stock, category } = req.body;
    const file: Express.Multer.File | undefined = req.file;

    if (!file) {
      return next(new ErrorHandler("Photo is Required", 400));
    }
    if (!name || !price || !stock || !category) {
      rm(file.path, () => {
        console.log("deleted");
      });
      return next(new ErrorHandler("All fileds are Required", 400));
    }
    const product = await Product.create({
      name,
      price,
      stock,
      category,
      photo: file?.path,
    });

    await invaildateCache({ product: true });
    return resp.status(201).json({
      status: 201,
      message: "Product Created succusfully !",
      succuss: true,
      data: product,
    });
  }
);
// generateRandomProducts(2)
export {
  newProduct,
  getLatestProduts,
  getAllCategories,
  getAdminProducts,
  getSingleProduct,
  updateProduct,
  getAllProducts,
};
