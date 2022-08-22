const UserService = require("../services/user.services");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class UserController {
  userService = new UserService();

  createUser = async (req, res, next) => {
    const { userId, email, nickname, password, host } = req.body;

    const createUserData = await this.userService.createUser(
      userId,
      email,
      nickname,
      password,
      host
    );

    if (!createUserData) {
      return res.status(400).json({
        result: false,
        errormessage: "회원 가입에 실패하였습니다.",
      });
    }

    res.status(200).json({
      result: true,
      Message: "회원 가입에 성공하였습니다.",
    });
  };

  login = async (req, res, next) => {
    const { userId, password } = req.body;

    const loginUserData = await this.userService.login(userId, password);

    if (!loginUserData) {
      res.status(400).json({
        result: false,
        errorMessage: "로그인에 실패하였습니다",
      });
      return;
    }

    let payload = {
      userkey: loginUserData.userkey,
      nickname: loginUserData.nickname,
    };
    const token = jwt.sign(payload, process.env.secret_key, {
      expiresIn: "1d",
    });
    res.header("token", token);

    res.status(200).json({
      result: true,
      token: token,
      Message: "로그인에 성공하였습니다",
    });
  };

  duplicateCheck = async(req, res, next) => {
    const {key, value} = req.body;

    const duplicateCheckData = await this.userService.duplicateCheck(key, value);

    if(!duplicateCheckData){
      return res.status(200).json({
        ok: true,
        Message: key + "이(가) 중복이 아닙니다"
      });
    };

    res.status(400).json({
      ok: false, 
      errorMessage: key + "이(가) 중복입니다"
    });
  };
};

module.exports = UserController;
