const UserService = require("../services/user.services");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class UserController {
  userService = new UserService();

  createUser = async (req, res, next) => {
    const { userId, email, nickname, password, host } = req.body;

    const validation_Id = /^(?=.*[a-zA-Z])[-a-zA-Z0-9_.]{6,12}$/;
    const validation_nickname = /^(?=.*[a-zA-Z가-힣])[a-zA-Z가-힣]{2,6}$/;
    const validation_password = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{5,20}$/;
    const validation_email = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

    if (userId === "" || email === "" || nickname === "" || password === "" || host === undefined) {
      return res.status(400).json({
        result: false,
        errorMessage: "빈 값이 존제합니다.",
      });
    }

    // 코드 검사용 로그
    // console.log(validation_Id.test(userId));
    // console.log(validation_nickname.test(nickname));
    // console.log(validation_password.test(password));
    // console.log(validation_email.test(email));
    // console.log(typeof(host) === "boolean");

    if (!validation_Id.test(userId) || !validation_nickname.test(nickname) || !validation_password.test(password) || !validation_email.test(email) || typeof(host) !== "boolean") {
      return res.status(400).json({
        result: false,
        errorMessage: "올바르지 않은 값이 존제합니다.",
      });
    };

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
        errorMessage: "회원 가입에 실패하였습니다.",
      });
    };

    res.status(200).json({
      result: true,
      Message: "회원 가입에 성공하였습니다.",
    });
  };

  login = async (req, res, next) => {
    const { userId, password } = req.body;

    if (userId === "" || password === "") {
      return res.status(400).json({
        result: false,
        errorMessage: "빈 값이 존제합니다.",
      });
    }

    const loginUserData = await this.userService.login(userId, password);

    if (!loginUserData) {
      res.status(400).json({
        result: false,
        errorMessage: "로그인에 실패하였습니다",
      });
      return;
    };

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

    if (key === "" || value === "") {
      return res.status(400).json({
        result: false,
        errorMessage: "빈 값이 존제합니다.",
      });
    }

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
