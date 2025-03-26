import {Product,Image} from "../models/User.js";

// Create a new product
export const createProduct = async (req, res) => {
  try {
    // Step 1: Extract product data from request body
    const { productName, price, Discount, categoryId } = req.body;

    // Step 2: Create and save the product
    const newProduct = new Product({ productName, price, Discount, categoryId });
    const savedProduct = await newProduct.save();

    // Step 3: Check if images were uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    // Step 4: Handle image uploads and associate them with the product
    const imageFields = ["image1", "image2", "image3"];
    let uploadedImages = [];

    imageFields.forEach((field) => {
      if (req.files[field]) {
        uploadedImages.push({
          productId: savedProduct._id, // Associate image with the newly created product
          imageUrls: `/uploads/${req.files[field][0].filename}`,
        });
      }
    });

    // Step 5: Store images in the database
    const savedImages = await Image.insertMany(uploadedImages);

    // Step 6: Return response with product and images
    res.status(201).json({
      message: "Product created successfully",
      product: savedProduct,
      images: savedImages,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Get all products
export const getAllProducts = async (req, res) => {
  try {
    // Fetch products and populate categoryId
    const products = await Product.find().populate("categoryId");

    // Fetch images for each product
    const productsWithImages = await Promise.all(
      products.map(async (product) => {
        const images = await Image.find({ productId: product._id });

        return {
          ...product.toObject(),
          images, // Attach images to each product
        };
      })
    );

    res.json({products:productsWithImages});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("categoryId");
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
};


// by company id 
export const getProductsByCompanyId = async (req, res) => {
  try {
    const products = await Product.find().populate("categoryId");

    // Filter products by companyId
    const filteredProducts = products.filter(
      (product) => product.categoryId && product.categoryId.companyId.toString() === req.params.companyId
    );

    if (filteredProducts.length === 0) {
      return res.status(404).json({ message: "No products found for this company" });
    }

    // Fetch images for all products in one query
    const productIds = filteredProducts.map((p) => p._id);
    const images = await Image.find({ productId: { $in: productIds } });

    // Attach images to corresponding products
    const productsWithImages = filteredProducts.map((product) => ({
      ...product.toObject(),
      images: images.filter((img) => img.productId.toString() === product._id.toString()),
    }));

    res.json(productsWithImages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};



// by category 
export const getProductsByCategoryId = async (req, res) => {
  try {
    const products = await Product.find({ categoryId: req.params.categoryId }).populate("categoryId");

    if (!products.length) {
      return res.status(404).json({ message: "No products found for this category" });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    // Step 1: Extract product data from request body
    const { productName, price, Discount, categoryId } = req.body;

    // Step 2: Find and update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { productName, price, Discount, categoryId },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Step 3: Check if images were uploaded
    if (req.files && Object.keys(req.files).length > 0) {
      const imageFields = ["image1", "image2", "image3"];
      let uploadedImages = [];

      imageFields.forEach((field) => {
        if (req.files[field]) {
          uploadedImages.push({
            productId: updatedProduct._id,
            imageUrls: `/uploads/${req.files[field][0].filename}`,
          });
        }
      });

      // Step 4: Remove existing images and insert new ones
      await Image.deleteMany({ productId: updatedProduct._id });
      const savedImages = await Image.insertMany(uploadedImages);

      return res.status(200).json({
        message: "Product updated successfully",
        product: updatedProduct,
        images: savedImages,
      });
    }

    // Step 5: Return response without updating images
    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Delete product
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
