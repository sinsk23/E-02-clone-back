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
    duplicateCheck = async(key, value) => {
        let duplicateCheckData;
        
        if(key === "userId"){
            duplicateCheckData = await this.userRepository.duplicateCheck_userId(value);
        }
        if(key === "nickname"){
            duplicateCheckData = await this.userRepository.duplicateCheck_nickname(value);
        }
        if(key === "email"){
            duplicateCheckData = await this.userRepository.duplicateCheck_email(value);
        }

        return duplicateCheckData;
    };
};
module.exports = UserService;