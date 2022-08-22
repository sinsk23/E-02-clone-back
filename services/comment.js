const CommentRepository = require('../repositories/comment');


class CommentService{
    commentRepository = new CommentRepository();
    //Service계층 - 댓글생성
    insertComment = async(userkey,itemkey,comment,star)=>{
            
        
        const getItemkey = await this.commentRepository.itemkeygetPost(itemkey);
        
        
           return await this.commentRepository.insertComment(
                userkey,itemkey,comment, star
            )
        
    }

    //Service계층 - 댓글조회
    getComment = async(itemkey)=>{
        const findComment = await this.commentRepository.commentkeygetComment(itemkey);
        return findComment

    }
    getCommentone = async(itemkey)=>{
        const findComment = await this.commentRepository.itemkeygetComment(itemkey);
        return findComment

    }


     //Service계층 - 댓글수정
     editComment = async(userkey,commentkey,comment,star)=>{
        //해당 commentkey를 찾아
        const findcommentId = await this.commentRepository.commentkeygetOne(commentkey);

        
        //해당 commentkey 수정
        return await this.commentRepository.editComment(userkey,commentkey,comment,star);

     }

     //Service계층 - 댓글삭제
     delComment = async(userkey,commentkey)=>{

        await this.commentRepository.commentkeygetOne(commentkey);
        
        return await this.commentRepository.delComment(userkey,commentkey);

     }

     //Service계층 - 작성자 비교
     difUserkey = async(userkey,commentkey)=>{

        return await this.commentRepository.difUserkey(userkey,commentkey);
     }

     //Service - 별점 평균내서 가져오기
     avgStar = async(commentkey)=>{

        return await this.commentRepository.avgStar(commentkey);
     }

}
module.exports = CommentService;