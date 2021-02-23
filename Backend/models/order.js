import mongoose from "mongoose";

const order = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
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
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", order);
