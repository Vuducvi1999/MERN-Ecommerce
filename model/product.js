const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
      required: false,
      type: Boolean,
    },
  },
  { timestamps: true }
);

// export default
module.exports = mongoose.model("product", Product);
