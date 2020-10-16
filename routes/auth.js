const express = require("express");
const route = express.Router();
const { SignUp, SignIn, SignOut } = require("../controller/auth");

route.post("/signup", SignUp);
route.post("/signin", SignIn);
route.get("/signout", SignOut);

module.exports = route;
