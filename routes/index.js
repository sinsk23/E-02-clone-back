const express = require("express");
const router = express.Router();

const userRouter = require("./user");
const itemRouter = require("./item");
const likeRouter = require("./like");
const commentRouter = require("./comment");

//swagger modules import
const { swaggerUi, specs } = require("../modules/swagger");
//  경로 /api/swagger
router.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));

router.use("/user", userRouter);
router.use("/item", itemRouter);
router.use("/like", likeRouter);
router.use("/comment", commentRouter);

module.exports = router;
