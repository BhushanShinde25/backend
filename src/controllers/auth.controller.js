import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, Company } from "../models/User.js";

// Import Company model

export const register = async (req, res) => {
  try {
    const { userName, email, password, companyName } = req.body;
    console.log(req.body);

    if (!userName || !email || !password || !companyName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const company = await Company.findOne({ companyName });

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Find company by companyName

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user with the found company ID
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
      companyId: company._id, // Store company's object ID
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
// Login User
export const login = async (req, res) => {
  try {
    const { email, password, companyName } = req.body;

    if (!email || !password || !companyName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const company = await Company.findOne({ companyName });

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    console.log(user);

    const token = jwt.sign(
      { userId: user._id, companyId: user.companyId }, // Include companyId
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token, user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
