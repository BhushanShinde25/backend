import mongoose from "mongoose";
import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 0;

// Connect to Database and Start Server
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
export default async function handler(req, res) {
  await connectDB();
  return app(req, res); // Vercel handles requests differently
}
