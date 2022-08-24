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


/**
 * @swagger
 *  /api:
 *    get:
 *      tags:
 *      - Item
 *      description: 숙소 모두 보여주기(메인페이지)
 *      operationId : 
 *      responses:
 *        200:
 *          schema:
 *           type: object
 *           properties:
 *            itemkey:
 *              type: integer
 *              example: '1'
 *            title:
 *              type: string
 *              example: '게시글 제목'
 *            img:
 *              type: string
 *            category:
 *            price:
 *              type: integer
 *              example: '3000'
 *            location:
 *              type: string
 *            star:
 *              type: integer
 *              example: '4.5'
 *            like:
 *               type: integer
 *               example: '1'
 *            auth:
 *               type: string
 *               example: 'auth'
 */

/**
 * @swagger
 *  /api:
 *    post:
 *      tags:
 *      - Item
 *      description: 숙소 생성하기
 *      operationId : sample
 *      parameters:
 *      - in: "body"
 *        name: "sample"
 *        description: "호스트만 숙소 생성하기"
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            title:
 *              type: string
 *              example: '게시글 제목'
 *            img:
 *              type: string
 *              example: 'img'             
 *            content:
 *              type: string
 *              example: '게시글 내용'
 *            category:
 *            price:
 *              type: integer
 *              example: '3000'
 *            location:
 *              type: string
 *              example: '위치'
 *              
 * 
 *            
 *      responses:
 *        200:
 *          description: ""
 *        400-1:
 *          description: "항목들을 모두 입력해주세요."
 *        400-2:
 *          description: "숙소 등록에 실패하였습니다."
 */

/**
 * @swagger
 *  /api/{itemkey}:
 *    get:
 *      tags:
 *      - Item
 *      description: 숙소 상세 페이지 보여주기
 *      operationId : sample
 *      responses:
 *        200:
 *          schema:
 *           type: object
 *           properties:
 *            itemkey:
 *              type: string
 *              example: '1'
 *            title:
 *              type: string
 *              example: '게시글 제목'
 *            img:             
 *            content:
 *              type: string
 *              example: '게시글 내용'
 *            category:
 *            price:
 *              type: integer
 *              example: '3000'
 *            location:
 *              type: string
 *              example: '위치'
 * 
 *      
 *      
 */

/**
 * @swagger
 *  /api/{itemkey}:
 *    put:
 *      tags:
 *      - Item
 *      description: 숙소 수정하기
 *      operationId : 
 *      parameters:
 *      - in: "body"
 *        name: 
 *        description: "숙소 수정하기"
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            itemkey:
 *              type: string
 *              example: '1'
 *            title:
 *              type: string
 *              example: '게시글 제목'
 *            img:             
 *            content:
 *              type: string
 *              example: '게시글 내용'
 *            category:
 *            price:
 *              type: integer
 *              example: '3000'
 *            location:
 *              type: string
 *              example: '위치'
 *      responses:
 *        200:
 *          description: "숙소를 수정했습니다."
 *        400-1:
 *          description: "항목들을 모두 입력해주세요."
 *        400-2:
 *          description: "해당 숙소를 찾을 수 없습니다."
 *        400-3:
 *          description: "호스트가 일치 하지 않습니다."
 *        400-4:
 *          description: "숙소 수정에 실패하였습니다."
 */


/**
 * @swagger
 *  /api/{itemkey}:
 *    delete:
 *      tags:
 *      - Item
 *      description: 숙소 삭제하기
 *      operationId : sample
 *      parameters:
 *      - in: "path"
 *        name: sample
 *        description: "숙소 삭제하기"
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            itemkey:
 *             type: integer
 *             example: '1'
 *      responses:
 *        200:
 *          description: "숙소를 삭제했습니다."
 *        400-1:
 *          description: "해당 숙소를 찾을 수 없습니다."
 *        400-2:
 *          description: "호스트가 일치 하지 않습니다."
 *        400-3:
 *          description: "숙소 삭제에 실패하였습니다."
 */



