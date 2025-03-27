import {Poster} from "../models/User.js";
import multer from "multer";
import path from 'path';
import fs from "fs";
// ✅ Create a new poster
export const createPoster = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    const { companyId } = req.body;
    if (!companyId) {
      return res.status(400).json({ success: false, message: "Company ID is required" });
    }

    // ✅ Delete existing poster before creating a new one
    await Poster.deleteOne({ companyId });

    // ✅ Extract uploaded file paths as an array
    const imagePaths = [];
    ["image1", "image2", "image3"].forEach((field) => {
      if (req.files[field]) {
        req.files[field].forEach((file) => imagePaths.push(`/uploads/${file.filename}`));
      }
    });

    // ✅ Create new poster entry
    const newPoster = new Poster({
      companyId,
      imageUrl: imagePaths, // ✅ Ensure it's an array
    });

    await newPoster.save();

    res.status(201).json({
      success: true,
      message: "Poster created successfully! Previous poster (if any) was deleted.",
      poster: newPoster,
    });
  } catch (error) {
    console.error("Error creating poster:", error);
    res.status(500).json({ success: false, message: "Error creating poster", error: error.message });
  }
};


// ✅ Get all posters
export const getAllPosters = async (req, res) => {
  try {
    const posters = await Poster.find().populate("companyId", "companyName");
    res.status(200).json({ success: true, posters });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching posters", error: error.message });
  }
};

// ✅ Get a single poster by ID
export const getPosterById = async (req, res) => {
  try {
    const poster = await Poster.findOne({companyId:req.params.id}).populate("companyId", "companyName");
    
    if (!poster) {
      return res.status(404).json({ success: false, message: "Poster not found" });
    }

    res.status(200).json({ success: true, poster });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching poster", error: error.message });
  }
};

// ✅ Update a poster
export const updatePoster = async (req, res) => {
  try {
    const { image } = req.body;
    const poster = await Poster.findByIdAndUpdate(req.params.id, { image }, { new: true });

    if (!poster) {
      return res.status(404).json({ success: false, message: "Poster not found" });
    }

    res.status(200).json({ success: true, message: "Poster updated successfully", poster });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating poster", error: error.message });
  }
};

// ✅ Delete a poster
export const deletePoster = async (req, res) => {
  try {
    const { companyId, image } = req.body;

    if (!companyId || !image) {
      return res.status(400).json({ success: false, message: "Company ID and image path are required." });
    }

    // Find the poster document by companyId
    const poster = await Poster.findOne({ companyId });
    if (!poster) {
      return res.status(404).json({ success: false, message: "Company posters not found." });
    }
    console.log(poster)
    console.log(image)
    // Filter out the image from the imageUrl array
    const updatedImages = poster.imageUrl.filter((img) => img !== image);

    if (updatedImages.length === poster.imageUrl.length) {
      return res.status(404).json({ success: false, message: "Image not found in the poster list." });
    }

    // Update the document in the database
    await Poster.findOneAndUpdate({ companyId }, { imageUrl: updatedImages });

    // Delete the file from the server (optional)
    const filePath = path.join("src/public", image); // Adjust the folder path as needed
    fs.unlink(filePath, (err) => {
      if (err) {
        console.warn("Failed to delete file:", err.message);
      }
    });

    res.status(200).json({ success: true, message: "Poster deleted successfully." });

  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting poster", error: error.message });
  }
};
