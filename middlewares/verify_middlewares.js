const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = (req, res, next) => {
    const {token} = req.headers;
    
    if(token){
        const [tokenType, tokenValue] = authentication.split(" ");

        const {privatekey} = jwt.verify(tokenValue, process.env.secret_key);

        User.findByPk(privatekey).then((userkey, nickname) => {
            res.locals.user = {userkey, nickname};
            console.log(res.locals.user);
            next();
        });
        return;
    };

    next();
};