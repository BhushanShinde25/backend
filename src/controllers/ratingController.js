import { Rating } from "../models/User.js"; // Ensure correct model path

// ✅ Create a Rating (Supports JSON & Form Data)
export const createRating = async (req, res) => {
  try {
     
    const { userId, productId, rating } = req.body;

    if (!userId || !productId || !rating) {
      return res.status(400).json({ message: "User ID, Product ID, and Rating are required" });
    }

    const newRating = new Rating({ userId, productId, rating  });
    await newRating.save();

    res.status(201).json({ message: "Rating created successfully", rating: newRating });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Get All Ratings
export const getAllRatings = async (req, res) => {
  try {
    const ratings = await Rating.find().populate("productId userId", "name email");
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Get Rating by ID
export const getRatingById = async (req, res) => {
  try {
    const { productId } = req.params;

    const ratings = await Rating.find({ productId }).populate("userId", "name email");

    if (ratings.length === 0) {
      return res.status(404).json({ message: "No ratings found for this product" });
    }

    res.json(ratings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Update Rating (Supports JSON & Form Data)
export const updateRating = async (req, res) => {
  try {
    const updatedRating = await Rating.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedRating) return res.status(404).json({ message: "Rating not found" });

    res.json({ message: "Rating updated successfully", rating: updatedRating });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Delete Rating
export const deleteRating = async (req, res) => {
  try {
    const rating = await Rating.findByIdAndDelete(req.params.id);

    if (!rating) return res.status(404).json({ message: "Rating not found" });

    res.json({ message: "Rating deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
