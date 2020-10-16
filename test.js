const bcrypt = require("bcryptjs");

const a = bcrypt.genSaltSync();
console.log(a);
