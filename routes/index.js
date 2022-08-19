const express = require("express");
const router = express.Router();

const userRouter = require("./user");
const itemRouter = require("./item");

router.use("/user", userRouter);
router.use("/item", itemRouter);

module.exports = router;
