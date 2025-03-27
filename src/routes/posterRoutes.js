import express from "express";
import upload from "../middlewares/upload1.js";
import {
  createPoster,
  getAllPosters,
  getPosterById,
  updatePoster,
  deletePoster
} from "../controllers/posterController.js";

const router = express.Router();

router.post("/",upload, createPoster); // Create a new poster
router.get("/", getAllPosters); // Get all posters
router.get("/:id", getPosterById); // Get a specific poster
router.put("/:id", updatePoster); // Update a poster
router.delete("/:id", deletePoster); // Delete a poster

export default router;
