import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema(
  { id: String, name: String, img: String, price: Number, qty: Number },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    items: { type: [OrderItemSchema], required: true },
    subtotal: { type: Number, required: true },
    status: { type: String, default: "PLACED" },
    address: { type: String, default: "" },
    placedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("order", OrderSchema);
