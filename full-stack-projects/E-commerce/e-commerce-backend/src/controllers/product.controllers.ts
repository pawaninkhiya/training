import { rm } from "fs";
import { Product } from "../models/product.models";
import { NewProductRequest } from "../types/types";
import { ErrorHandler, TryCatch } from "../utils/errorHandler";
import { Request, Response, NextFunction } from "express";

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

    return resp.status(201).json({
      status: 201,
      message: "Product Created succusfully !",
      succuss: true,
      data: product,
    });
  }
);

const getLatestProduts = TryCatch(async (req, resp, next) => {
  const product = await Product.find({}).sort({ createdAt: -1 }).limit(5);

  return resp.status(200).json({
    status: 200,
    message: "Product fetched succussfully !",
    data: product,
  });
});

const getAllCategories = TryCatch(async (req, resp, next) => {
  const categories = await Product.distinct("category");
  return resp.status(200).json({
    status: 200,
    message: "Categories fetched succussfully !",
    data: categories,
  });
});

const getAdminProducts = TryCatch(async (req, resp, next) => {
  const products = await Product.find({});
  return resp.status(200).json({
    status: 200,
    message: "Products fetched succussfully !",
    data: products,
  });
});

const getSingleProduct = TryCatch(async (req, resp, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
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
  // await product.save();

  return resp.status(200).json({
    status: 200,
    success: true,
    message: "Product updated successfully",
    // data: product,
  });
});

export {
  newProduct,
  getLatestProduts,
  getAllCategories,
  getAdminProducts,
  getSingleProduct,
  updateProduct,
};
