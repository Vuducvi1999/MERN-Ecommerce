const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const expressjwt = require("express-jwt");

module.exports.SignUp = (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ err: "All field is required" });
  const salt = bcrypt.genSaltSync();
  const new_password = bcrypt.hashSync(password, salt);
  const new_user = new User({ name, email, password: new_password });
  new_user
    .save()
    .then((v) => res.json({ user: v }))
    .catch((err) => res.status(400).json({ err: "Email already exist" }));
};

module.exports.SignIn = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((v) => {
      if (!bcrypt.compareSync(password, v.password))
        return res.status(401).json({ err: "Wrong password" });
      const token = jwt.sign({ a: v._id }, process.env.JWT_SECRET);
      res.cookie("t", token, { expire: new Date() + 1000 * 60 * 60 });
      const { _id, name, email, role } = v;
      return res.json({ token, user: { _id, name, email, role } });
    })
    .catch((err) =>
      res.status(400).json({ err: "Email doesn't exist, please sign up" })
    );
};

module.exports.SignOut = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Sign out success" });
};

module.exports.RequireSignIn = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

module.exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0)
    return res.status(403).json({ err: "Admin resource! Access denied" });
  next();
};
