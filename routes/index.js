const express = require("express");
const router = express.Router();

const userRouter = require("./user");
const itemRouter = require("./item");
const likeRouter = require("./like");

router.use("/user", userRouter);
router.use("/item", itemRouter);
router.use("/like", likeRouter);

module.exports = router;
