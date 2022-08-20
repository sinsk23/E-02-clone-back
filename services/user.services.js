const UserRepository = require("../repositories/user.repositories");

class UserService{
    userRepository = new UserRepository();

    createUser = async(userId, email, nickname, password, host) => {
        const createUserData = await this.userRepository.createUser(userId, email, nickname, password, host);

        return{
            nickname: createUserData.nickname
        };
    };

    login = async(userId, password) => {
        const loginUserData = await this.userRepository.login(userId, password);

        try{
            return{
                userkey: loginUserData.userkey,
                nickname: loginUserData.nickname
            };
        }catch{

        };
    };
};
module.exports = UserService;