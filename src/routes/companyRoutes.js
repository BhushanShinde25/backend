import express from "express";
import {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany
} from "../controllers/companyController.js";

const router = express.Router();

router.post("/", createCompany); // Create a new company
router.get("/", getAllCompanies); // Get all companies
router.get("/:id", getCompanyById); // Get a specific company
router.put("/:id", updateCompany); // Update a company
router.delete("/:id", deleteCompany); // Delete a company

export default router;
