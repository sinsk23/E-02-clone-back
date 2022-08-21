const CommentService = require('../services/comment');

class CommentController{
    commentService = new CommentService();
    

    //후기(댓글) 작성하기 /api/comment/:itemkey
    insertComment = async(req, res, next) =>{
        try{
        const {userkey} = res.locals.user.userkey;
        console.log("유저키~~~~~~~~~~~~~~~~~~~~~~~~~~~",{userkey});
        const {itemkey} = req.params;
        const {comment, star} = req.body;
       //게시글이 없으면~
        if(!itemkey){
            return res.status(400).json({result:false, errormessage:'댓글을 작성할 게시글이 존재하지 않습니다.'})
        //댓글 내용이 없으면~
        }else if(comment === undefined){
            return res.status(400).json({ result: false, message: '댓글을 입력해주세요'})
        } 
        
        const commentData = await this.commentService.insertComment(
            userkey,
            itemkey,
            comment,
            star,
        )
        
        return res.status(201).json({data : commentData});
        }catch (error) {
            console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
            return res.status(401).json({ result : false,
                errormessage: "댓글 작성에 실패하셨습니다",
            });
          }


        //에러 검출후 완료시 밑 코드랑 내용 바꾸기
        // return res.status(401).json({err:err.message});
        // 
    }

    //후기(댓글) 불러오기(조회) /api/comment/:itemkey
    getComment = async(req, res, next) =>{
     try{
     const {itemkey} = req.params;
     if(!itemkey){
            return res.status(400).json({ result: false, errormessage: "댓글을 불러오지 못하였습니다."})
        }

     const commentData = await this.commentService.getComment(itemkey);
     return res.status(201).json({data : [commentData]});

    }catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).json({ result : false,
            errormessage: "댓글을 불러오지 못했습니다.",
        });
      }

    }

    //후기(댓글) 수정하기 /api/comment/:commentkey
    editComment = async(req, res, next) =>{
        try{
        const {userkey} = res.locals.user.userkey;
        const {commentkey}= req.params;
        const {comment ,star} = req.body;
        if(!commentkey){
            return res.status(400).json({ result: false, errormessage: '수정 할 댓글이 존재하지 않습니다.'});
        }


        await this.commentService.editComment(
            userkey,
            commentkey,
            comment,
            star,
        )

        return res.status(201).json({result : true, message: '후기(댓글)을 수정했습니다.'});
        
    } catch (error) {
            console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
            return res.status(401).json({ result : false,
                errormessage: "댓글 수정에 실패하셨습니다",
            });
          }
    }

    

    //후기(댓글) 삭제하기 /api/comment/:commentkey
    delComment = async(req, res, next) =>{
        try{
        const { userkey } = res.locals.user.userkey;
        const { commentkey } = req.params;
        
        await this.commentService.delComment(
            userkey,commentkey
        )
        return res.status(200).json({result : true, message:"후기(댓글)을 삭제했습니다."});
        
    
    }catch (error) {
            console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
            return res.status(401).json({ result : false,
                errormessage: "댓글 삭제에 실패하셨습니다",
            });
          }

    
    }

    //별점 불러오기 '/api/commen/:commentkey'
    starPoint = async(req,res,nesxt)=>{
        // const {userkey} = res.locals.user.userkey;
        // const {commentkey} = res.params;


    }


}

module.exports = CommentController;