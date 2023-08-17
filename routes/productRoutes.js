import express from "express";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  getSingleProductPhotoController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

// routes

// create product
router.post(
  "/create-product",
  requireSignin,
  isAdmin,
  formidable(),
  createProductController
);

// Update product
router.put(
  "/update-product/:pid", // pid is product id
  requireSignin,
  isAdmin,
  formidable(),
  updateProductController
);

// To Get all the Product

router.get("/getProduct", getProductController);

// to Get Single Product
router.get("/getProduct/:slug", getSingleProductController);

// get photo
router.get("/getProduct-photo/:pid", getSingleProductPhotoController);

// delete product

router.delete(
  "/delete-product/:pid",
  //   requireSignin,
  //   isAdmin,
  //   formidable(),
  deleteProductController
);

export default router;
