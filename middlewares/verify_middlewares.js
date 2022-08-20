const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = (req, res, next) => {
    if(!req.headers){
        next();
    };

    const [tokenType, tokenValue] = req.headers.split(" ");

    const { privatekey } = jwt.verify(tokenValue, process.env.secret_key);

    User.findByPk(privatekey).then((userkey, nickname) => {
        res.locals.user = {userkey, nickname};
        console.log(res.locals.user);
        next();
    });
};