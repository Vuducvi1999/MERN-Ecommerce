const User = require("../model/user");
const bcrypt = require("bcryptjs");

module.exports.userById = (req, res, next, id) => {
  User.findById(id)
    .populate("history")
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
  User.findById(req.profile._id)
    .then((data) => {
      if (!bcrypt.compareSync(req.body.password, data.password))
        return res.status(400).json({ err: "Wrong password" });
      if (data.email !== req.body.email)
        return res.status(400).json({ err: "Wrong email" });
      if (req.body.confirm) {
        const salt = bcrypt.genSaltSync();
        const new_password = bcrypt.hashSync(req.body.confirm, salt);
        data.password = new_password;
      }
      data.name = req.body.name;
      data.save();
      return res.json({ user: data });
    })
    .catch((err) => res.status(400).json({ err: "User not found" }));

  // User.findByIdAndUpdate(req.profile._id, req.body, {
  //   new: true,
  //   useFindAndModify: false,
  // })
  //   .then((user) => {
  //     user.password = undefined;
  //     return res.json({ user });
  //   })
  //   .catch((err) => res.status(400).json({ err: "User not found" }));
};
