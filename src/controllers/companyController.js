import {Company} from "../models/User.js";

// Create a new company
export const createCompany = async (req, res) => {
  try {
    const { companyName, email, password, companyLogo, companyCategory } = req.body;
    const newCompany = new Company({ companyName, email, password, companyLogo, companyCategory });
    await newCompany.save();
    res.status(201).json(newCompany);
  } catch (error) {
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
    const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCompany) return res.status(404).json({ message: "Company not found" });
    res.status(200).json(updatedCompany);
  } catch (error) {
    res.status(500).json({ message: "Error updating company", error });
  }
};

// Delete a company
export const deleteCompany = async (req, res) => {
  try {
    const deletedCompany = await Company.findByIdAndDelete(req.params.id);
    if (!deletedCompany) return res.status(404).json({ message: "Company not found" });
    res.status(200).json({ message: "Company deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting company", error });
  }
};
