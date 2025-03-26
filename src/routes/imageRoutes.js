import express from "express";
import {
  uploadImage,
  getAllImages,
  getImageById,
  deleteImage
} from "../controllers/imageController.js";

const router = express.Router();

router.post("/", uploadImage); // Upload an image
router.get("/", getAllImages); // Get all images
router.get("/:id", getImageById); // Get a specific image
router.delete("/:id", deleteImage); // Delete an image

export default router;
