const { Order } = require("../model/order");
const User = require("../model/user");
const Product = require("../model/product");

module.exports.createOrder = (req, res) => {
  // req.body.order.user = req.profile;
  const newOrder = new Order(req.body.order);
  newOrder
    .save()
    .then((data) => {
      console.log(data);
      User.findByIdAndUpdate(
        req.profile._id,
        { $push: { history: data._id } },
        { new: true, useFindAndModify: true }
      ).catch((err) =>
        res.status(400).json({ err: "Couldn't update user purchase history" })
      );
      return res.json({ order: data });
    })
    .catch((err) => res.status(400).json({ err: "Field require" }));
};

module.exports.updateHistory = (req, res, next) => {
  // const history = req.body.order.products;

  // User.findByIdAndUpdate(
  //   req.profile._id,
  //   { $push: { history: history } },
  //   { new: true, useFindAndModify: true }
  // )
  //   .then((data) => next())
  //   .catch((err) =>
  //     res.status(400).json({ err: "Couldn't update user purchase history" })
  //   );
  next();
};

module.exports.updateSold = (req, res, next) => {
  req.body.order.products.forEach((p) => {
    Product.findByIdAndUpdate(
      p._id,
      { quantity: 0, sold: p.sold + p.quantity },
      { new: true, useFindAndModify: true }
    ).catch((err) =>
      res.status(400).json({ err: "Couldn't update product sold" })
    );
    console.log("ok");
  });
  next();
};

module.exports.viewOrders = (req, res) => {
  Order.find()
    .populate("user")
    .then((data) => res.json({ orders: data }))
    .catch((err) => res.status(400).json({ err: "Couldn't get orders" }));
};

module.exports.detailOrder = (req, res) => {
  Order.findById(req.params.orderId)
    .populate("user")
    .then((data) => res.json({ order: data }))
    .catch((err) => res.status(400).json({ err: "Couldn't get detail order" }));
};

module.exports.getStatus = (req, res) => {
  return res.json({ status: Order.schema.path("status").enumValues });
};

module.exports.setStatus = (req, res) => {
  const { orderId } = req.params;
  Order.findByIdAndUpdate(
    orderId,
    { status: req.body.status },
    { new: true, useFindAndModify: true }
  )
    .then((data) => res.json({ order: data }))
    .catch((err) => res.status(400).json({ err: "Couldn't set status order" }));
};

module.exports.deleteOrder = (req, res) => {
  const user = req.profile;
  Order.findByIdAndDelete(req.params.orderId)
    .then((data) => res.json({ order: data }))
    .catch((err) => res.status(400).json({ err: "Couldn't delete order" }));
};
