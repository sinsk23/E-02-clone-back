const CommentRepository = require('../repositories/comment');


class CommentService{
    commentRepository = new CommentRepository();
    //Service계층 //서비스 계층 변수 바꾸기 //1.해당 게시글조회 2.조회한 게시글에서 댓글작성하기
    insertComment = async(comment,star) =>{
            //댓글 생성 위한 해당 게시글 찾기
        try{    
        const getItemkey = await this.해당게시글전체조회로직(itemkey);
        //게시글이 없으면~
        if(!getItemkey){
            return { result: false, errormessage: '해당 게시물이 존재하지 않습니다.'}
        //댓글 내용이 없으면~
        }else if(comment === undefined){
            return { result: false, message: '댓글을 입력해주세요'}
        } else {
            await this.commentRepository.insertComment({
                comment, star
            })
        }

    }catch(err){
        //에러 검출후 완료시 밑 코드랑 내용 바꾸기
        return res.status(401).json({err:err.message});
        // return res.status(401).json({result:false, errormessage:'댓글 작성에 실패하였습니다.'})
    }

    }








}
module.exports = CommentService;