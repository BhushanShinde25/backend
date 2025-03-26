import express from "express";
import upload  from "../middlewares/upload.js";
import {
  uploadImages,
  getImagesByProductId,
  updateImage,
  deleteImages
} from "../controllers/imageController.js";

const router = express.Router();

router.post("/",upload.array("images", 5), uploadImages); // Upload an image
router.get("/:productId", getImagesByProductId); // Get all images
router.put("/update/:id", upload.single("images"),updateImage); // Get a specific image
router.delete("/delete/:productId", deleteImages); // Delete an image

export default router;
