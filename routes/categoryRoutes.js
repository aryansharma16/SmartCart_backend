import express from "express";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";
import {
  CategoryConttroller,
  createCategoryController,
  updateCategoryConttroller,
  singleCategoryConttroller,
  DeleteCategoryConttroller,
} from "../controllers/categoryController.js";

const router = express.Router();

// create category
router.post(
  "/create-category",
  requireSignin,
  isAdmin,
  createCategoryController
);

// update category

router.put(
  "/update-category/:id",
  requireSignin,
  isAdmin,
  updateCategoryConttroller
);
// get all category

router.get("/get-category", CategoryConttroller);

// to get specific single category

router.get("/single-category/:slug", singleCategoryConttroller);

// to delete the category
router.delete(
  "/delete-category/:id",
  requireSignin,
  isAdmin,
  DeleteCategoryConttroller
);

export default router;
