const UserRepository = require("../repositories/user.repositories");

class UserService{
    userRepository = new UserRepository();

    createUser = async(userId, email, nickname, password) => {
        const createUserData = await this.userRepository.createUser(userId, email, nickname, password);

        return{
            nickname: createUserData.nickname
        };
    };

    login = async(userId, password) => {
        const loginUserData = await this.userRepository.login(userId, password);

        return{
            userId: loginUserData.userId,
            nickname: loginUserData.nickname
        };
    };
};
module.exports = UserService;