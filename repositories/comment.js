const Commentmodel = require('../models/comment');

class CommentRepository{
    //후기(댓글) 작성하기 /api/comment/:itemkey
    insertComment = async (userkey, itemkey, comment, star)=>{
        const commentData = await Commentmodel.create({
            userkey, itemkey, comment, star
        })

        console.log("~~~~~~~댓글 레포 생성부분~~~~~~~~");

        return commentData;
    }


}

module.exports = CommentRepository;