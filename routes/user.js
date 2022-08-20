const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middlewares/auth_middlewares");
const DuplicateLoginCheckMiddleware = require("../middlewares/duplicate-login-check_middlewares");
const VerifyMiddleware = require("../middlewares/verify_middlewares");
const UserController = require("../controllers/user.controllers");
const userController = new UserController();

router.post("/join", DuplicateLoginCheckMiddleware, userController.createUser);
router.post("/login", VerifyMiddleware, DuplicateLoginCheckMiddleware, userController.login);

module.exports = router;
