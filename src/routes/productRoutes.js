
import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCompanyId
} from "../controllers/productController.js";

const router = express.Router();

router.post("/", createProduct); // Create a new product
router.get("/", getAllProducts); // Get all products
router.get("/:id", getProductById); // Get a specific product
router.get("/company/:companyId", getProductsByCompanyId);


router.put("/:id", updateProduct); // Update a product
router.delete("/:id", deleteProduct); // Delete a product

export default router;
