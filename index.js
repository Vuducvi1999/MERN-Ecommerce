// Require Dependencies
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// require middleware
const AuthRouter = require("./routes/auth");
const UserRouter = require("./routes/user");
const CategoryRouter = require("./routes/category");
const ProductRouter = require("./routes/product");
const OrderRouter = require("./routes/order");

// using dependencies
const app = express();
app.use(cors());

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", AuthRouter);
app.use("/api", UserRouter);
app.use("/api", CategoryRouter);
app.use("/api", ProductRouter);
app.use("/api", OrderRouter);

// connect db
mongoose
  .connect(
    "mongodb+srv://vuducvi:vuducvi@cluster0.z8cct.gcp.mongodb.net/ecommerce?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(console.log("connect db success"))
  .catch(console.log("connect db fail"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
    console.log(path.resolve(__dirname, "client/build/index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server start port ${port}`);
});

app.get("/", (req, res) => {
  res.send("hello world");
});
