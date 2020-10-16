const Product = require("../model/product");
const formidable = require("formidable");
const fs = require("fs");
const { propertyOf } = require("lodash");
const { publicDecrypt } = require("crypto");
const Category = require("../model/category");

module.exports.productById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .catch((err) => res.status(400).json({ err: "Product not found" }))
    .then((product) => {
      if (!product) return res.status(400).json({ err: "Product not found" });
      req.product = product;
      next();
    });
};

module.exports.Read = (req, res) => {
  const product = req.product;
  product.photo = undefined;
  res.json({ product });
};

module.exports.Create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  // Parse from request to fields and files
  form.parse(req, (err, fields, files) => {
    if (err) return res.status(400).json({ err: "Image can't upload" });

    // Check Fields required
    const { name, description, price, category, quantity, shipping } = fields;
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        err: "All fields are required",
      });
    }

    const product = new Product(fields);

    if (files.photo) {
      // check image size uploaded
      if (files.photo.size > 1000000)
        return res.status(400).json({ err: "Image should < 1MB" });
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product
      .save()
      .then((product) => res.json({ product }))
      .catch((err) =>
        res.status(400).json({ err: "Something went wrong, try again" })
      );
  });
};

module.exports.Remove = (req, res) => {
  const product = req.product;
  product
    .remove()
    .then((product) => res.json({ msg: "Delete success" }))
    .catch((err) =>
      res.status(400).json({ err: "Something went wrong, try again" })
    );
};

module.exports.Update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  // Parse from request to fields and files
  form.parse(req, (err, fields, files) => {
    if (err) return res.status(400).json({ err: "Image can't upload" });

    // Check Fields required
    const { name, description, price, category, quantity, shipping } = fields;
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        err: "All fields are required",
      });
    }

    let product = req.product;
    product = Object.assign(product, fields);

    if (files.photo) {
      // check image size uploaded
      if (files.photo.size > 1000000)
        return res.status(400).json({ err: "Image should < 1MB" });
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product
      .save()
      .then((product) => res.json({ product }))
      .catch((err) =>
        res.status(400).json({ err: "Something went wrong, try again" })
      );
  });
};

/**
 * SORT
 * by sell:    /products?sortBy=sold&order=desc&limit=4
 * by arrival: /products?sortBy=createdAt&order=desc&limit=4
 * if no params, all products are returned
 */

module.exports.List = (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;
  Product.find()
    .select("-photo")
    .sort({ [sortBy]: order })
    .populate("category")
    .limit(limit)
    .then((products) => res.json(products))
    .catch((err) => res.status(400).json({ err: "Products not found" }));
};

module.exports.ListHomeSearch = (req, res) => {
  let nameProduct = req.body.name || "";
  let category = req.body.category || "";
  Product.find({ name: { $regex: nameProduct, $options: "i" }, category })
    .select("-photo")
    .populate("category")
    .then((products) => res.json(products))
    .catch((err) => res.status(400).json({ err: "Products not found" }));
};

/**
 *  List related product based on request category except current product
 *  FEATURE: RElated product
 */

module.exports.RelatedList = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;
  const product = req.product;

  Product.find({
    _id: { $ne: product._id },
    category: product.category,
  })
    .select("-photo")
    .populate("category", "name")
    .limit(limit)
    .then((products) => res.json(products))
    .catch((err) => res.status(400).json({ err: "Products not found" }));
};

module.exports.CategoryList = (req, res) => {
  Product.distinct("category", {}, (err, categories) => {
    if (err || !categories)
      return res.status(400).json({ err: "categories not found" });
    res.json(categories);
  });
};

/**
 *  FEATURE: Search
 */

module.exports.ListBySearch = (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Product.find(findArgs)
    .select("-photo")
    .populate("category")
    .sort({ [sortBy]: order })
    .skip(skip)
    .limit(limit)
    .then((products) => res.json({ size: products.length, products }))
    .catch((err) => res.status(400).json({ err: "Products not found" }));
};

module.exports.Photo = (req, res, next) => {
  if (req.product.photo.data) {
    return res.send(req.product.photo.data);
  } else return res.json({ msg: "not found image" });
};
