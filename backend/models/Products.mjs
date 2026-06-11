import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    slug: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      sparse: true
    },

    description: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    originalPrice: {
      type: Number,
      default: null
    },

    rating: {
      type: Number,
      default: 0
    },

    reviewCount: {
      type: Number,
      default: 0
    },

    stock: {
      type: Number,
      required: true,
      default: 0
    },

    category: {
      type: String,
      required: true,
      trim: true
    },

    brand: {
      type: String,
      trim: true,
      default: ""
    },

    image: {
      type: String,
      default: null
    },

    images: {
      type: [String],
      default: []
    },

    colors: {
      type: [String],
      default: []
    },

    sizes: {
      type: [String],
      default: []
    },

    isTrending: {
      type: Boolean,
      default: false
    },

    isBestSeller: {
      type: Boolean,
      default: false
    },

    isFlashSale: {
      type: Boolean,
      default: false
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active"
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Product", productSchema);