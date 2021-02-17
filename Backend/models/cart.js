import mongoose from "mongoose";

const cart = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cartItems: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Proudct",
          required: true,
        },
        productName: {
          type: String,
          required: true,
        },
        quantity: { type: Number, default: 1 },
        price: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cart);
