const UserService = require("../services/user.services");
const jwt = require("jsonwebtoken");
require("dotenv").config();


class UserController {
    userService = new UserService;

    createUser = async(req, res, next) => {
        const {userId, email, nickname, password} = req.body;

        const createUserData = await this.userService.createUser(userId, email, nickname, password);
        
        if(!createUserData){
            res.status(400).json({
                result: false,
                errormessage: "회원 가입에 실패하였습니다."
            });
        };

        res.status(200).json({
            result: true,
            message: "회원 가입에 성공하였습니다."
        });
    };
    
    login = async(userId, password) => {
        const {userId, password} = req.body;

        const loginUserData = await this.userService.login(userId, password);

        if(!loginUserData){
            res.status(400).json({
                result: false,
                errormessage: "로그인에 실패하였습니다"
            });
        };

        let payload = {userkey: loginUserData.userkey, nickname: loginUserData.nickname};
        const token = jwt.sign(payload, process.env.secret_key, {expiresIn: "1d"});

        res.status(200).json({
            result: true,
            token: token,
            message: "로그인에 성공하였습니다"
        });
    };
};

module.exports = UserController;