import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";
import posterRoutes from "./routes/posterRoutes.js";
import ratingRoutes from "./routes/ratingRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";

import authRoutes from "./routes/auth.routes.js";

dotenv.config();
const app = express();
app.use(express.static("public"));
// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/companies", companyRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/posters", posterRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/auth", authRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;
