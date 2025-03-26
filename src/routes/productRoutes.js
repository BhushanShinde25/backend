
import express from "express";
import upload from "../middlewares/upload1.js";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCompanyId,
  getProductsByCategoryId
} from "../controllers/productController.js";

const router = express.Router();

router.post("/", upload ,  createProduct); // Create a new product
router.get("/", getAllProducts); // Get all products
router.get("/:id", getProductById); // Get a specific product
router.get("/company/:companyId", getProductsByCompanyId);

router.get("/category/:categoryId", getProductsByCategoryId);
router.put("/:id", updateProduct); // Update a product
router.delete("/:id", deleteProduct); // Delete a product

export default router;
