const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controllers");
const userController = new UserController();

router.post("/join", userController.createUser);
router.post("/login", userController.login);

module.exports = router;
