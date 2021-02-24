import mongoose from "mongoose";

const merchantOrder = mongoose.Schema({
  merchantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
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
  status: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Merchant Order", merchantOrder);
