const express = require("express");
const route = express.Router();
const { userById } = require("../controller/user");
const { RequireSignIn, isAdmin } = require("../controller/auth");
const { Read, Update } = require("../controller/user");

route.get("/secret/:userId", RequireSignIn, isAdmin, (req, res) =>
  res.json({ user: req.profile })
);

route.get("/user/:userId", RequireSignIn, isAdmin, Read);
route.put("/user/:userId", RequireSignIn, isAdmin, Update);

route.param("userId", userById);

module.exports = route;
