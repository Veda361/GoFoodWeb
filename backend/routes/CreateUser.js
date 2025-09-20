import express from "express";
import User from "../models/User.js";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Create user
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({ min: 5 }).isString(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    try {
      const existing = await User.findOne({ email: req.body.email });
      if (existing) {
        return res.status(409).json({ success: false, error: "Email already registered" });
      }

      // Ensure password is string
      const passwordPlain = String(req.body.password);

      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(passwordPlain, salt);

      const doc = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
        location: req.body.location || "",
      });

      return res.status(201).json({ success: true, userId: doc._id });
    } catch (err) {
      console.error("Create user error:", err);
      return res.status(500).json({ success: false, error: "Server error" });
    }
  }
);


// Login user
router.post(
  "/loginuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const userData = await User.findOne({ email: req.body.email });
      if (!userData) {
        return res.status(400).json({ success: false, error: "Invalid credentials" });
      }

      const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
      if (!pwdCompare) {
        return res.status(400).json({ success: false, error: "Invalid credentials" });
      }

      const data = { user: { id: userData.id } };
      const authToken = jwt.sign(data, process.env.JWT_SECRET);

      return res.json({ success: true, user: userData, authToken });
    } catch (err) {
      console.error("Login error:", err);
      return res.status(500).json({ success: false, error: "Server error" });
    }
  }
);

export default router;
