const CommentService = require('../services/comment');

class CommentController{
    commentService = new CommentService();
    

    //후기(댓글) 작성하기 /api/comment/:itemkey
    insertComment = async(req, res, next) =>{
        
        const {userkey} = res.locals.user.userkey;
        console.log("유저키~~~~~~~~~~~~~~~~~~~~~~~~~~~",{userkey});
        const {itemkey} = req.params;
        const {comment, star} = req.body;
       
        
        const commentData = await this.commentService.insertComment(
            userkey,
            itemkey,
            comment,
            star,
        )
        
        return res.status(201).json({data : commentData});
        //에러 검출후 완료시 밑 코드랑 내용 바꾸기
        // return res.status(401).json({err:err.message});
        // return res.status(401).json({result:false, errormessage:'댓글 작성에 실패하였습니다.'})
    }

    //후기(댓글) 불러오기(조회) /api/comment/:itemkey
    getComment = async(req, res, next) =>{
     
     const {itemkey} = req.params;
     

     const commentData = await this.commentService.getComment(itemkey);
     return res.status(201).json({data : [commentData]});
    }

    //후기(댓글) 수정하기 /api/comment/:commentkey
    editComment = async(req, res, next) =>{

        const {userkey} = res.locals.user.userkey;
        const {commentkey}= req.params;
        const {comment ,star} = req.body;

        await this.commentService.editComment(
            userkey,
            commentkey,
            comment,
            star,
        )

        return res.status(201).json({result : true, message: '후기(댓글)을 수정했습니다.'});

    }

    

    //후기(댓글) 삭제하기 /api/comment/:commentkey
    delComment = async(req, res, next) =>{
        const { userkey } = res.locals.user.userkey;
        const { commentkey } = req.params;
        
        await this.commentService.delComment(
            userkey,commentkey
        )
        return res.status(200).json({result : true, message:"후기(댓글)을 삭제했습니다."});
    }
}

module.exports = CommentController;