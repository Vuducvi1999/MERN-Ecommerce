const express = require("express");
const route = express.Router();

const {
  Create,
  productById,
  Read,
  Remove,
  Update,
  List,
  RelatedList,
  CategoryList,
  ListBySearch,
  Photo,
  updateRate,
  ListHomeSearch,
} = require("../controller/product");
const { userById } = require("../controller/user");
const { isAdmin, RequireSignIn } = require("../controller/auth");

route.post("/product/create/:userId", RequireSignIn, isAdmin, Create);

route.get("/product/:productId", Read);

route.delete("/product/:productId/:userId", RequireSignIn, isAdmin, Remove);

route.put("/product/:productId/:userId", RequireSignIn, isAdmin, Update);

route.get("/products", List);

route.post("/products", ListHomeSearch);

route.get("/products/related/:productId", RelatedList);

route.get("/products/categories", CategoryList);

route.post("/products/by/search", ListBySearch);

route.post("/products/rate/:productId/:userId", updateRate);

route.get("/product/photo/:productId", Photo);

route.param("userId", userById);
route.param("productId", productById);

module.exports = route;
