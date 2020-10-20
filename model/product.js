const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Rate = new Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    rate: Number,
    review: { type: String, default: "" },
  },
  { timestamps: true }
);

// Create Schema
const Product = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    price: { type: Number, trim: true, required: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    quantity: { type: Number },
    sold: { type: Number, default: 0 },
    photo: { data: Buffer, contentType: String },
    shipping: {
      type: Boolean,
    },
    rate: [Rate],
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", Product);
