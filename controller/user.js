const User = require("../model/user");

module.exports.userById = (req, res, next, id) => {
  User.findById(id)
    .then((user) => {
      if (!user) return res.status(400).json({ err: "User not found" });
      req.profile = user;
      next();
    })
    .catch((err) => res.status(400).json({ err: "User not found" }));
};

module.exports.Read = (req, res) => {
  req.profile.password = undefined;
  res.json({ user: req.profile });
};

module.exports.Update = (req, res) => {
  User.findByIdAndUpdate(req.profile._id, req.body, {
    new: true,
    useFindAndModify: false,
  })
    .then((user) => {
      user.password = undefined;
      return res.json({ user });
    })
    .catch((err) => res.status(400).json({ err: "User not found" }));
};
