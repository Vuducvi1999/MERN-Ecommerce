const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { Order } = require("./order");

// Create Schema
const User = new Schema(
  {
    name: { type: String, trim: true, required: true },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      trim: true,
    },
    role: { type: Number, default: 0 },
    history: [{ type: mongoose.Types.ObjectId, ref: "order" }],
  },
  { timestamps: true }
);

// export default
module.exports = mongoose.model("user", User);
