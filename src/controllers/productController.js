import {Product} from "../models/User.js";

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("categoryId");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    const products = await Product.find()
      .populate({
        path: "categoryId",
        match: { companyId: req.params.companyId } // Filtering by companyId
      })
      .exec();

    // Remove products that have a null category (not matching the companyId)
    const filteredProducts = products.filter((product) => product.categoryId !== null);

    if (filteredProducts.length === 0) {
      return res.status(404).json({ message: "No products found for this company" });
    }

    res.status(200).json(filteredProducts);
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
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
