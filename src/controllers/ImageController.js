import {Image} from "../models/User.js";

// Create an image
export const uploadImage = async (req, res) => {
  try {
    const image = new Image(req.body);
    await image.save();
    res.status(201).json(image);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all images
export const getAllImages = async (req, res) => {
  try {
    const images = await Image.find().populate("productId");
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get image by ID
export const getImageById = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id).populate("productId");
    res.json(image);
  } catch (error) {
    res.status(404).json({ message: "Image not found" });
  }
};

// Update image
export const updateImage = async (req, res) => {
  try {
    const updatedImage = await Image.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedImage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete image
export const deleteImage = async (req, res) => {
  try {
    await Image.findByIdAndDelete(req.params.id);
    res.json({ message: "Image deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
