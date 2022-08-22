const { Comment, Item, User} = require("../models")


class CommentRepository{

    //게시글에서 itemkey값 가져오기
    itemkeygetPost = async (itemkey) =>{
        const getItem = await Item.findOne({where : {itemkey}}); 
        return getItem
    }


    //저장소~ 후기(댓글) 작성하기
    insertComment = async (userkey,itemkey,comment, star)=>{
        console.log("repo쪽 값확인",userkey,itemkey,comment,star);
        const commentData = await Comment.create({
            userkey,itemkey, comment, star
        })

        console.log("~~~~~~~댓글 레포 생성부분~~~~~~~~");

        return commentData;
    }

    //저장소~후기(댓글) 게시글의 댓글들 조회하기
    commentkeygetComment = async (itemkey) =>{
        const getItem = await Comment.findAll({where : {itemkey}}); 
        return getItem;
    }
    itemkeygetComment = async (itemkey) =>{
        const getItem = await Comment.findOne({where : {itemkey}}); 
        return getItem;
    }


    //저장소~후기(댓글) 특정 댓글 조회
    commentkeygetOne = async (commentkey)=>{
        const getOne = await Comment.findOne({where : {commentkey}});
        return getOne;
    }

    //저장소~ 후기(댓글) 수정하기 
    editComment = async(userkey, commentkey, comment ,star) =>{
        const editOne = await Comment.update({comment,star}, {where : {userkey ,commentkey}})
        return editOne;
    }

    //저장소~ 후기(댓글) 삭제하기

    delComment = async(userkey, commentkey)=>{
        const deleteOne = await Comment.destroy({where:{userkey, commentkey}})
        return deleteOne
    }


    difUserkey = async(userkey,commentkey)=>{
        //현재 유저키와 게시글의 유저키를 비교
        const nowUserkey = await User.findOne({where : {userkey}})
        const postUserkey = await Comment.findOne({where : {commentkey}})
        console.log("현 유저키 게시물 유저키",nowUserkey.userkey,postUserkey.userkey);
        if(nowUserkey.userkey!==postUserkey.userkey)
        return false;
        else
        return true;
    }

}

module.exports = CommentRepository;