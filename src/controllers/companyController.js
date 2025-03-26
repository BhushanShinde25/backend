import fs from "fs"; // Import file system module
import {Company} from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
// Create a new company
 

export const loginCompany = async (req, res) => {
  try {
    console.log(req.body); // Debugging: Check received request body

    const { email, password } = req.body;

    // Check if company exists
    const existingCompany = await Company.findOne({ email });
    if (!existingCompany) {
      return res.status(400).json({ message: "Company does not exist" });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, existingCompany.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: existingCompany._id, email: existingCompany.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // Token valid for 7 days
    );

    res.status(200).json({ user: existingCompany, token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in", error });
  }
};
export const createCompany = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);

    const { companyName, email, password, companyCategory } = req.body;
    const companyLogo = req.file ? req.file.path : null; // Save file path

    // Check if company already exists
    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      return res.status(400).json({ message: "Company already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new company
    const newCompany = new Company({
      companyName,
      email,
      password: hashedPassword, // Store hashed password
      companyLogo,
      companyCategory,
    });

    await newCompany.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newCompany._id, email: newCompany.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // Token valid for 7 days
    );

    res.status(201).json({ user: newCompany, token });
  } catch (error) {
    console.error("Error creating company:", error);
    res.status(500).json({ message: "Error creating company", error });
  }
};
// Get all companies
export const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving companies", error });
  }
};

// Get a specific company by ID
export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ message: "Company not found" });
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving company", error });
  }
};

// Update a company
 

export const updateCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ message: "Company not found" });

    // Check if a new image is uploaded
    let companyLogo = company.companyLogo; // Keep old image by default
    if (req.file) {
      // Delete old image if it exists
      if (company.companyLogo) {
        fs.unlinkSync(company.companyLogo); // Remove old image from uploads folder
      }
      companyLogo = req.file.path; // Save new image path
    }

    // Update company details
    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.id,
      { ...req.body, companyLogo },
      { new: true }
    );

    res.status(200).json(updatedCompany);
  } catch (error) {
    res.status(500).json({ message: "Error updating company", error });
  }
};

// Delete a company
 
export const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ message: "Company not found" });

    // Delete image if it exists
    if (company.companyLogo) {
      try {
        fs.unlinkSync(company.companyLogo); // Remove image from server
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }

    // Delete company from database
    await Company.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Company and associated image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting company", error });
  }
};

