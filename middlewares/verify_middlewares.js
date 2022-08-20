const jwt = require("jsonwebtoken");
const { User } = require("../models");
require("dotenv").config();

module.exports = (req, res, next) => {
  // const {token} = req.headers;
  const { authorization } = req.headers;
  console.log(authorization);

  if (authorization) {
    const [tokenType, tokenValue] = authorization.split(" ");

    const privatekey = jwt.verify(tokenValue, process.env.secret_key);
    User.findByPk(privatekey.userkey).then((user) => {
      res.locals.user = user;
      next();
    });
    return;
  }

  next();
};
