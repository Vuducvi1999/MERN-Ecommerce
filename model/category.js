const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const Category = new Schema(
  { name: { type: String, trim: true, required: true, unique: true } },
  { timestamps: true }
);

// export default
module.exports = mongoose.model("category", Category);
