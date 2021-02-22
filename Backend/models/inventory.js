import mongoose from "mongoose";

const inventory = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  stockQuantity: {
    type: Number,
    required: true,
  },
  Date: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Inventory", inventory);
