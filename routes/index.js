const express = require("express");
const router = express.Router();

const userRouter = require("./user");


const commentRouter = require('./comment');


router.use("/user", userRouter);






router.use("/comment/", commentRouter);




module.exports = router;
