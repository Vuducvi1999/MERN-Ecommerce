const express = require("express");

const { RequireSignIn, isAdmin } = require("../controller/auth");
const {
  createOrder,
  updateHistory,
  updateSold,
  viewOrders,
  getStatus,
  setStatus,
  detailOrder,
} = require("../controller/order");
const { userById } = require("../controller/user");
const route = express.Router();

route.param("userId", userById);

route.post(
  "/order/create/:userId",
  RequireSignIn,
  updateHistory,
  updateSold,
  createOrder
);

route.get("/order/status", getStatus);

route.get("/order/get/:userId", RequireSignIn, isAdmin, viewOrders);

route.post(
  "/order/set-status/:orderId/:userId",
  RequireSignIn,
  isAdmin,
  setStatus
);

route.get("/order/:orderId", RequireSignIn, detailOrder);

module.exports = route;
