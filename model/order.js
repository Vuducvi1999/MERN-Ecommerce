const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartItemSchema = new Schema(
  {
    product: { type: mongoose.Types.ObjectId, ref: "product" },
    name: String,
    price: Number,
    quantity: Number,
  },
  { timestamps: true }
);

exports.CartItem = mongoose.model("cartItem", CartItemSchema);

const OrderSchema = new Schema(
  {
    products: [CartItemSchema],
    amount: Number,
    address: { type: String, required: true },
    status: {
      type: String,
      default: "Processed",
      enum: ["Processed", "Shipping", "Delivered", "Cancelled"],
    },
    updated: Date,
    sdt: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

exports.Order = mongoose.model("order", OrderSchema);
