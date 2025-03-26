import express from "express";
import {
  createRating,
  getAllRatings,
  getRatingById,
  updateRating,
  deleteRating
} from "../controllers/ratingController.js";

const router = express.Router();

router.post("/", createRating); // Create a new rating
router.get("/", getAllRatings); // Get all ratings
router.get("/:id", getRatingById); // Get a specific rating
router.put("/:id", updateRating); // Update a rating
router.delete("/:id", deleteRating); // Delete a rating

export default router;
