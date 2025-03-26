import {Poster} from "../models/User.js";

// ✅ Create a new poster
export const createPoster = async (req, res) => {
  try {
    const { companyId, image } = req.body;

    const newPoster = new Poster({ companyId, image });
    await newPoster.save();

    res.status(201).json({ success: true, message: "Poster created successfully", poster: newPoster });
  } catch (error) {
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
    const poster = await Poster.findById(req.params.id).populate("companyId", "companyName");
    
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
    const poster = await Poster.findByIdAndDelete(req.params.id);

    if (!poster) {
      return res.status(404).json({ success: false, message: "Poster not found" });
    }

    res.status(200).json({ success: true, message: "Poster deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting poster", error: error.message });
  }
};
