import mongoose from "mongoose";

const product = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: String,
      required: true,
    },
    quantity: { type: Number, required: true },
    description: {
      type: String,
      required: true,
      trim: true,
    },

    offer: { type: Number },
    productPictures: [{ img: { type: String } }],
    reviews: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId },
        ref: "User",
        review: String,
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    createdBy: {
      tyep: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Product", product);
