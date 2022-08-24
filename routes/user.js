const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middlewares/auth_middlewares");
const DuplicateLoginCheckMiddleware = require("../middlewares/duplicate-login-check_middlewares");
const VerifyMiddleware = require("../middlewares/verify_middlewares");
const UserController = require("../controllers/user.controllers");
const userController = new UserController();

router.post("/join", DuplicateLoginCheckMiddleware, userController.createUser);
router.post("/login", DuplicateLoginCheckMiddleware, userController.login);
router.get("/check", userController.duplicateCheck);

module.exports = router;























/**
 * @swagger
 *  /api/join:
 *    post:
 *      tags:
 *      - User
 *      description: 회원가입
 *      operationId : createUser
 *      parameters:
 *      - in: "body"
 *        name: "join"
 *        description: "유저 회원가입"
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            userkey:
 *              type: integer
 *              example: '1'
 *            userId:
 *              type: string
 *              example: '나의아이디'
 *            email:
 *              type: string
 *              example: 'myuserid@google.com'
 *            host:
 *              type: BOOLEAN
 *              example: '0'
 *            nickname:
 *              type: STRING
 *              example: '닉네임'
 *            password:
 *              type: STRING
 *              example: '12345'
 *      responses:
 *        200:
 *          description: "회원 가입에 성공하였습니다."
 *        400:
 *          description: "회원 가입에 실패하였습니다."
 *        
 *        
 */

/**
 * @swagger
 *  /api/login:
 *    get:
 *      tags:
 *      - User
 *      description: 후기(댓글) 불러오기
 *      operationId : login
 *      parameters:
 *      - in: "body"
 *        name: "login"
 *        description: "특정 게시글에 댓글들 불러오기"
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            userkey:
 *              type: integer
 *              example: '1'
 *            userId:
 *              type: string
 *              example: '나의아이디'
 *            email:
 *              type: string
 *              example: 'myuserid@google.com'
 *            host:
 *              type: BOOLEAN
 *              example: '0'
 *            nickname:
 *              type: STRING
 *              example: '닉네임'
 *            password:
 *              type: STRING
 *              example: '12345'
 *            
 *      responses:
 *        200:
 *          description: "로그인에 성공하였습니다"
 *        400:
 *          description: "로그인에 실패하였습니다"
 *        
 *        
 *        
 */
