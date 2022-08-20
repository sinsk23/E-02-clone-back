const express = require("express");
const router = express.Router();
const Comment = require('../controllers/comment');
const CommentController = new Comment();
const AuthMiddleware = require("../middlewares/auth_middlewares");

// /comment로들어와~
router.route('/:itemkey')
.get(CommentController.getComment)
.post(AuthMiddleware,CommentController.insertComment)
router.route('/:commentkey')
.put(AuthMiddleware,CommentController.editComment)
.delete(AuthMiddleware,CommentController.delComment)



module.exports = router;