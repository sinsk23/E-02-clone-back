const express = require("express");
const router = express.Router();

const userRouter = require("./user");
const itemRouter = require("./item");
const likeRouter = require("./like");

const commentRouter = require("./comment");

router.use("/user", userRouter);
router.use("/item", itemRouter);
router.use("/like", likeRouter);
router.use("/comment/", commentRouter);

module.exports = router;
