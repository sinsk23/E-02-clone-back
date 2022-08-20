const {User} = require("../models");

class UserRepository {
    createUser = async(userId, email, nickname, password) => {
        const users = await User.create({userId, email, nickname, password});
        return users;
    }

    login = async(userId, password) => {
        const users = await User.findOne({while: {userId, password}});
        return users;
    }
}
module.exports = UserRepository;