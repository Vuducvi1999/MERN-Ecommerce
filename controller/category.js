const Category = require("../model/category");

module.exports.Create = (req, res) => {
  const new_category = new Category(req.body);
  new_category
    .save()
    .then((data) => res.json({ category: data }))
    .catch((err) => res.status(400).json({ err: "Category already exist" }));
};

module.exports.categoryById = (req, res, next, id) => {
  Category.findById(id)
    .then((category) => {
      if (!category) return res.status(400).json({ err: "Category not found" });
      req.category = category;
      next();
    })
    .catch((err) => res.status(400).json({ err: "Category not found" }));
};

module.exports.Read = (req, res) => {
  return res.json(req.category);
};

module.exports.Update = (req, res) => {
  let category = req.category;
  category = Object.assign(category, req.body);
  category
    .save()
    .then((category) => res.json(category))
    .catch((err) => res.status(400).json({ err: "Category already exist" }));
};

module.exports.Remove = (req, res) => {
  const category = req.category;
  category
    .remove()
    .then((category) => res.json({ msg: "Delete success" }))
    .catch((err) =>
      res.status(400).json({ err: "Something went wrong, try again" })
    );
};

module.exports.List = (req, res) => {
  Category.find()
    .then((categories) => res.json(categories))
    .catch((err) =>
      res.status(400).json({ err: "Something went wrong, try again" })
    );
};
