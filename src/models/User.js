import mongoose from "mongoose";

// User Profile Schema (Company)
const CompanySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  companyLogo: { type: String, required: true }, // URL of logo
  companyCategory: { type: String, required: true }
});

const Company = mongoose.model("Company", CompanySchema);

// Category Schema (One-to-Many with UserProfile)
const CategorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true }
});

const Category = mongoose.model("Category", CategorySchema);

// Product Schema (One-to-Many with Category)
const ProductSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  Discount: { type: Number, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }
});

const Product = mongoose.model("Product", ProductSchema);

// Image Schema (One-to-Many with Product)
 
const ImageSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  imageUrls: { type: String, required: true }, // Store multiple image URLs
});

 
const Image = mongoose.model("Image", ImageSchema);

// Poster Schema (One-to-One with UserProfile)
const PosterSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  imageUrl: { type: String, required: true }
});

const Poster = mongoose.model("Poster", PosterSchema);

// User Schema (For rating)
const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model("User", UserSchema);

// Rating Schema (One-to-Many with Product and User)
const RatingSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 }
});

const Rating = mongoose.model("Rating", RatingSchema);

export { Company , Category, Product, Image, Poster, User, Rating };
