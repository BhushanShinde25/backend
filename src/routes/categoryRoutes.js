import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getCategoriesByCompanyId
} from "../controllers/categoryControl.js";

const router = express.Router();

router.post("/", createCategory); // Create a new category
router.get("/", getAllCategories); // Get all categories
router.get("/:id", getCategoryById); // Get a specific category
router.get("/categories/:id", getCategoriesByCompanyId); // get by company id

router.put("/:id", updateCategory); // Update a category
router.delete("/:id", deleteCategory); // Delete a category

export default router;
