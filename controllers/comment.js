const CommentService = require('../services/comment');

class CommentController{
    commentService = new CommentService();

    //후기(댓글) 작성하기 /api/comment/:itemkey
    insertComment = async(req, res, next) =>{
        const {userkey} = res.locals.user;

        const {itemkey} = req.params;
        const {comment, star} = req.body;

        const commentData = await this.commentService.insertComment(
            userkey,
            itemkey,
            comment,
            star,
        )
            res.status(201).json({data : commentData});
    }

    //후기(댓글) 조회하기 /api/comment/:itemkey
    getComment = async(req, res, next) =>{
    

    }
}

module.exports = CommentController;