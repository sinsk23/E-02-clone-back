const jwt = require("jsonwebtoken");
const { User } = require("../models");
require("dotenv").config();

module.exports = (req, res, next) => {
  // const {token} = req.headers;
  const { authorization } = req.headers;
  // console.log(authorization);

  if (authorization) {
    const [tokenType, tokenValue] = authorization.split(" ");

    try {
      const privatekey = jwt.verify(tokenValue, process.env.secret_key);
      User.findByPk(privatekey.userkey).then((user) => {
        res.locals.user = user;
        next();
      });
      return;
    } catch (err) {
      res.status(401).json({
        result: false,
        errormessage: "토큰 유효성 검사에 실패했습니다.",
      });
      return;
    }
  }

  next();
};
