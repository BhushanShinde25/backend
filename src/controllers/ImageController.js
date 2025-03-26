 import {Image} from "../models/User.js";
 import fs from "fs";
 import path from "path";
// // Create an image
// export const uploadImage = async (req, res) => {
//   try {
//     const image = new Image(req.body);
//     await image.save();
//     res.status(201).json(image);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get all images
// export const getAllImages = async (req, res) => {
//   try {
//     const images = await Image.find().populate("productId");
//     res.json(images);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get image by ID
// export const getImageById = async (req, res) => {
//   try {
//     const image = await Image.findById(req.params.id).populate("productId");
//     res.json(image);
//   } catch (error) {
//     res.status(404).json({ message: "Image not found" });
//   }
// };

// // Update image
// export const updateImage = async (req, res) => {
//   try {
//     const updatedImage = await Image.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updatedImage);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Delete image
// export const deleteImage = async (req, res) => {
//   try {
//     await Image.findByIdAndDelete(req.params.id);
//     res.json({ message: "Image deleted" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


 
 

// Upload multiple images
export const uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    // Store image URLs
    const images = await Promise.all(
      req.files.map(async (file,i) => {
        const newImage = new Image({
          productId: req.body.productId,
          imageUrls: `/uploads/${file.filename}`, // Store file path
        });
        return await newImage.save();
      })
    );

    res.status(201).json({ message: "Images uploaded successfully", images });


    // Create image document
  
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getImagesByProductId = async (req, res) => {
  try {
    const images = await Image.find({ productId: req.params.productId });

    if (!images.length) {
      return res.status(404).json({ message: "No images found for this product" });
    }

    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 
//  Delete Image Record and File
export const deleteImages = async (req, res) => {
  try {
    const images = await Image.find({ productId: req.params.productId });
    if (!images.length) return res.status(404).json({ message: "No images found for this product" });

    // Delete image files from server

      images.forEach((image)=>{
        image.imageUrls.forEach((imagePath)=>{
          const filePath = path.join(process.cwd(), imagePath);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        })
        
      })
        

    // Remove images from DB
    await Image.deleteMany({ productId: req.params.productId });

    res.json({ message: "Images deleted successfully for the product" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




//  Update Image (Replaces Old Images)
export const updateImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).json({ message: "Image not found" });
    if(!req.file) res.status(500).json({ message: "file not attached" });
    // Delete old image files from server
      const filePath = path.join(process.cwd(), image.imageUrls);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

    // Store new image URLs
    const newImageUrls = `/uploads/${req.file.filename}`;

    // Update database record
    const updatedImage = await Image.findByIdAndUpdate(
      req.params.id,
      { imageUrls: newImageUrls },
      { new: true }
    );

    res.json(updatedImage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
