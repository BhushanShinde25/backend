import {Rating} from "../models/User.js";

// Create a rating
export const createRating = async (req, res) => {
  try {
    const rating = new Rating(req.body);
    await rating.save();
    res.status(201).json(rating);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all ratings
export const getAllRatings = async (req, res) => {
  try {
    const ratings = await Rating.find().populate("productId userId");
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get rating by ID
export const getRatingById = async (req, res) => {
  try {
    const rating = await Rating.findById(req.params.id).populate("productId userId");
    res.json(rating);
  } catch (error) {
    res.status(404).json({ message: "Rating not found" });
  }
};

// Update rating
export const updateRating = async (req, res) => {
  try {
    const updatedRating = await Rating.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedRating);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete rating
export const deleteRating = async (req, res) => {
  try {
    await Rating.findByIdAndDelete(req.params.id);
    res.json({ message: "Rating deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
