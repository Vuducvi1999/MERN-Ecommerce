const express = require("express");
const route = express.Router();

const {
  Create,
  categoryById,
  Read,
  Update,
  Remove,
  List,
} = require("../controller/category");
const { RequireSignIn, isAdmin } = require("../controller/auth");
const { userById } = require("../controller/user");

route.post("/category/create/:userId", RequireSignIn, isAdmin, Create);

route.put("/category/:categoryId/:userId", RequireSignIn, isAdmin, Update);

route.delete("/category/:categoryId/:userId", RequireSignIn, isAdmin, Remove);

route.get("/categories", List);

route.get("/category/:categoryId", Read);

route.param("userId", userById);
route.param("categoryId", categoryById);

module.exports = route;
