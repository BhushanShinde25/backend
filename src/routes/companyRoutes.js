import express from "express";
import upload  from "../middlewares/upload.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany
} from "../controllers/companyController.js";

const router = express.Router();

router.post("/", upload.single("companyLogo") , authMiddleware ,createCompany); // Create a new company
router.get("/", getAllCompanies); // Get all companies
router.get("/:id", getCompanyById); // Get a specific company
router.put("/:id", upload.single("companyLogo") , updateCompany); // Update a company
router.delete("/:id", deleteCompany); // Delete a company

export default router;
