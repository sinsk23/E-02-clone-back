const {User} = require("../models");

class UserRepository {
    createUser = async(userId, email, nickname, password, host) => {
        const users = await User.create({userId, email, nickname, password, host});
        return users;
    };

    login = async(userId, password) => {
        const users = await User.findOne({where: {userId}});
        return users;
    };

    duplicateCheck_userId = async(value) => {
        const users = await User.findOne({where: {userId: value}});
        return users;
    };

    duplicateCheck_nickname = async(value) => {
        const users = await User.findOne({where: {nickname: value}});
        return users;
    };

    duplicateCheck_email = async(value) => {
        const users = await User.findOne({where: {email: value}});
        return users;
    };
};
module.exports = UserRepository;