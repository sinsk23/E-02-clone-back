const CommentRepository = require('../repositories/comment');


class CommentService{
    commentRepository = new CommentRepository();
    //Service계층 - 댓글생성
    insertComment = async(userkey,itemkey,comment,star)=>{
            
        console.log("서비스 계층 아이템 키!~~~~~~~~~~~~~~~~~~~~~~~~~~",itemkey);
        const getItemkey = await this.commentRepository.itemkeygetPost(itemkey);
        console.log("찾은 아이템키 ~~~~~~~~~~~", getItemkey)
        
        //게시글이 없으면~
        if(!getItemkey){
            return { result: false, errormessage: '해당 게시물이 존재하지 않습니다.'}
        //댓글 내용이 없으면~
        }else if(comment === undefined){
            return { result: false, message: '댓글을 입력해주세요'}
        } 
           return await this.commentRepository.insertComment(
                userkey,itemkey,comment, star
            )
        
    }

    //Service계층 - 댓글조회
    getComment = async(itemkey)=>{
        const findComment = await this.commentRepository.commentkeygetComment(itemkey);
        if(!findComment){
            return { result: false, errormessage: '해당 게시물이 존재하지 않습니다.'}
        }

        return findComment

    }

     //Service계층 - 댓글수정
     editComment = async(userkey,commentkey,comment,star)=>{
        //해당 commentkey를 찾아
        const findcommentId = await this.commentRepository.commentkeygetOne(commentkey);

        if(!findcommentId){
            return { result: false, errormessage: '해당 댓글이 존재하지 않습니다.'}
        }
        //해당 commentkey 수정
        return await this.commentRepository.editComment(userkey,commentkey,comment,star);

     }

     //Service계층 - 댓글삭제
     delComment = async(userkey,commentkey)=>{

        await this.commentRepository.commentkeygetOne(commentkey);
        
        return await this.commentRepository.delComment(userkey,commentkey);

     }





}
module.exports = CommentService;