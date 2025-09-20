import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Order from "../models/Orders.js";

dotenv.config();
const router = express.Router();

function auth(req, res, next) {
  try {
    const hdr = req.headers.authorization || "";
    const token = hdr.startsWith("Bearer ") ? hdr.slice(7) : null;
    if (!token) return res.status(401).json({ success: false, error: "No token" });
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user;
    next();
  } catch {
    return res.status(401).json({ success: false, error: "Invalid token" });
  }
}

router.post("/orders", auth, async (req, res) => {
  try {
    const { items, address = "" } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, error: "Empty items" });
    }
    const clean = items.map((it) => ({
      id: String(it.id),
      name: String(it.name || ""),
      img: String(it.img || ""),
      price: Number(it.price || 0),
      qty: Number(it.qty || 1),
    }));
    const subtotal = clean.reduce((s, it) => s + it.price * it.qty, 0);

    const doc = await Order.create({
      userId: req.user.id,
      items: clean,
      subtotal,
      address,
    });

    return res.status(201).json({ success: true, orderId: doc._id });
  } catch (err) {
    console.error("Place order error:", err);
    return res.status(500).json({ success: false, error: "Server error" });
  }
});

router.get("/orders", auth, async (req, res) => {
  try {
    const list = await Order.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .lean();
    return res.json({ success: true, orders: list });
  } catch (err) {
    console.error("Fetch orders error:", err);
    return res.status(500).json({ success: false, error: "Server error" });
  }
});

export default router;
