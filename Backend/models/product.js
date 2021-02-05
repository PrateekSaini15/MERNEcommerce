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
    description: {
      type: String,
      required: true,
      trim: true,
    },

    offer: { type: Number },
    productPictures: [{ img: { type: String } }],
    reviews: [
      {
        userId: mongoose.Schema.Types.ObjectId,
        ref: "User",
        review: String,
      },
    ],
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    createdBy: { tyep: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Product", product);
