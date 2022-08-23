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

router.route('/:itemkey/star')
.get(CommentController.starPoint)


module.exports = router;

/**
 * @swagger
 *  /api/comment/{itemkey}:
 *    post:
 *      tags:
 *      - Comment
 *      description: 후기(댓글) 작성
 *      operationId : insertComment
 *      parameters:
 *      - in: "body"
 *        name: "itemkey"
 *        description: "특정 게시글에 댓글 작성"
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            commentkey:
 *              type: integer
 *              example: '1'
 *            comment:
 *              type: string
 *              example: '댓글내용(50자 제한)'
 *            star:
 *              type: integer
 *              example: '5'
 *            userkey:
 *              type: integer
 *              example: '1'
 *            itemkey:
 *              type: integer
 *              example: '1'
 *            
 *      responses:
 *        200:
 *          description: "후기(댓글) 생성."
 *        400:
 *          description: "댓글을 작성할 게시글이 존재하지 않습니다."
 *        400-1:
 *          description: "댓글을 입력해주세요"
 *        412:
 *          description: "댓글 형식이 일치하지 않습니다."
 *        401:
 *          description: "댓글 작성에 실패하셨습니다"
 *        
 */

/**
 * @swagger
 *  /api/comment/{itemkey}:
 *    get:
 *      tags:
 *      - Comment
 *      description: 후기(댓글) 불러오기
 *      operationId : getComment
 *      parameters:
 *      - in: "path"
 *        name: "itemkey"
 *        description: "특정 게시글에 댓글들 불러오기"
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            commentkey:
 *              type: integer
 *              example: '1'
 *            comment:
 *              type: string
 *              example: '댓글내용(50자 제한)'
 *            star:
 *              type: integer
 *              example: '5'
 *            userkey:
 *              type: integer
 *              example: '1'
 *            itemkey:
 *              type: integer
 *              example: '1'
 *            
 *      responses:
 *        200:
 *          description: "후기(댓글) 불러오기."
 *        400:
 *          description: "게시글이 존재하지 않습니다."
 *        400-1:
 *          description: "댓글을 불러오지 못하였습니다."
 *        
 *        
 */

/**
 * @swagger
 *  /api/comment/{commentkey}:
 *    put:
 *      tags:
 *      - Comment
 *      description: 후기(댓글) 수정하기
 *      operationId : editComment
 *      parameters:
 *      - in: "body"
 *        name: "commentkey"
 *        description: "특정 댓글 수정하기"
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            commentkey:
 *              type: integer
 *              example: '1'
 *            comment:
 *              type: string
 *              example: '댓글내용(50자 제한)'
 *            star:
 *              type: integer
 *              example: '5'
 *            userkey:
 *              type: integer
 *              example: '1'
 *            itemkey:
 *              type: integer
 *              example: '1'
 *            
 *      responses:
 *        201:
 *          description: "후기(댓글)을 수정했습니다."
 *        400-1:
 *          description: "수정 할 댓글이 존재하지 않습니다."
 *        400-2:
 *          description: "작성자가 달라 수정 할 수 없습니다."
 *        401:
 *          description: "댓글 수정에 실패하셨습니다"
 *        412:
 *          description: "댓글 형식이 일치하지 않습니다."
 *        
 */

/**
 * @swagger
 *  /api/comment/{commentkey}:
 *    delete:
 *      tags:
 *      - Comment
 *      description: 후기(댓글) 삭제하기
 *      operationId : delComment
 *      parameters:
 *      - in: "body"
 *        name: "commentkey"
 *        description: "특정 댓글 삭제하기"
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            commentkey:
 *              type: integer
 *              example: '1'
 *            comment:
 *              type: string
 *              example: '댓글내용(50자 제한)'
 *            star:
 *              type: integer
 *              example: '5'
 *            userkey:
 *              type: integer
 *              example: '1'
 *            itemkey:
 *              type: integer
 *              example: '1'
 *            
 *      responses:
 *        200:
 *          description: "후기(댓글)을 삭제했습니다."
 *        400-1:
 *          description: "삭제 할 댓글이 존재하지 않습니다."
 *        400-2:
 *          description: "작성자가 달라 삭제 할 수 없습니다."
 *        401:
 *          description: "댓글 삭제에 실패하셨습니다"
 *        
 *        
 */