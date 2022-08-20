const express = require("express");
const router = express.Router();
const Comment = require('../controllers/comment');
const CommentController = new Comment();



router.route('/:itemkey').get(CommentController.getComment).post(CommentController.insertComment)
router.route('/:commentkey').put().delete()



module.exports = router;