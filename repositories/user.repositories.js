const {User} = require("../models");

class UserRepository {
    createUser = async(userId, email, nickname, password, host) => {
        const users = await User.create({userId, email, nickname, password, host});
        return users;
    };

    login = async(userId, password) => {
        const users = await User.findOne({where: {userId, password}});
        return users;
    };
};
module.exports = UserRepository;