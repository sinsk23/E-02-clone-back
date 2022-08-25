const CommentService = require("../services/comment");
const CommentRepository = require("../repositories/comment");

class CommentController {
  commentService = new CommentService();
  commentRepository = new CommentRepository();

  //후기(댓글) 작성하기 /api/comment/:itemkey
  insertComment = async (req, res, next) => {
    try {
      const regexComment = /^[\s\S]{1,50}$/; //1~50자리수제한

      const { userkey } = res.locals.user.userkey;
      console.log("유저키~~~~~~~~~~~~~~~~~~~~~~~~~~~", { userkey });
      const { itemkey } = req.params;
      const { comment, star } = req.body;
      //게시글을 찾아 없으면~
      const findItemkey = await this.commentService.getCommentone(itemkey);
      if (!findItemkey) {
        return res
          .status(400)
          .json({
            result: false,
            errormessage: "댓글을 작성할 게시글이 존재하지 않습니다.",
          });
        //댓글 내용이 없으면~
      }
      if (comment === "" || null) {
        return res
          .status(400)
          .json({ result: false, message: "댓글을 입력해주세요" });
      }
      // 댓글 글자수 제한을 넘었을시~
      if (!isRegexValidation(comment, regexComment)) {
        return res
          .status(412)
          .json({
            result: false,
            errorMessage: "댓글 형식이 일치하지 않습니다.",
          });
      }

      const commentData = await this.commentService.insertComment(
        userkey,
        itemkey,
        comment,
        star
      );

      return res.status(201).json({ data: commentData });
    } catch (error) {
      return res
        .status(401)
        .json({ result: false, errormessage: "댓글 작성에 실패하셨습니다" });
    }
  };

  //후기(댓글) 불러오기(조회) /api/comment/:itemkey
  getComment = async (req, res, next) => {
    try {
      const { itemkey } = req.params;
      const finditemkey = await this.commentRepository.itemkeygetPost(itemkey);

      if (!finditemkey) {
        return res
          .status(400)
          .json({ result: false, errormessage: "게시글이 존재하지 않습니다." });
      }

      const commentData = await this.commentService.getComment(itemkey);
      return res.status(201).json({ data: commentData });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ result: false, errormessage: "댓글을 불러오지 못하였습니다." });
    }
  };

  //후기(댓글) 수정하기 /api/comment/:commentkey
  editComment = async (req, res, next) => {
    try {
      const regexComment = /^[\s\S]{1,50}$/; //1~50자리수제한
      const { userkey } = res.locals.user.userkey;
      const { commentkey } = req.params;
      const { comment, star } = req.body;
      const findcommentkey = await this.commentRepository.commentkeygetOne(
        commentkey
      );
      if (!findcommentkey) {
        return res.status(400).json({
          result: false,
          errormessage: "수정 할 댓글이 존재하지 않습니다.",
        });
      }
      //작성자가 다르면(userkey가 다르면)
      const difuserkey = await this.commentService.difUserkey(
        userkey,
        commentkey
      );
      // console.log(difuserkey);
      if (difuserkey === false) {
        return res.status(400).json({
          result: false,
          errormessage: "작성자가 달라 수정 할 수 없습니다.",
        });
      }
      if (!isRegexValidation(comment, regexComment)) {
        return res.status(412).json({
          result: false,
          errorMessage: "댓글 형식이 일치하지 않습니다.",
        });
      }

      await this.commentService.editComment(userkey, commentkey, comment, star);

      return res
        .status(201)
        .json({ result: true, message: "후기(댓글)을 수정했습니다." });
    } catch (error) {
      console.log(error);
      return res
        .status(401)
        .json({ result: false, errormessage: "댓글 수정에 실패하셨습니다" });
    }
  };

  //후기(댓글) 삭제하기 /api/comment/:commentkey
  delComment = async (req, res, next) => {
    try {
      const { userkey } = res.locals.user.userkey;
      const { commentkey } = req.params;

      const findcommentkey = await this.commentRepository.commentkeygetOne(
        commentkey
      );
      if (!findcommentkey) {
        return res.status(400).json({
          result: false,
          errormessage: "삭제 할 댓글이 존재하지 않습니다.",
        });
      }

      const difuserkey = await this.commentService.difUserkey(
        userkey,
        commentkey
      );
      if (difuserkey === false) {
        return res.status(400).json({
          result: false,
          errormessage: "작성자가 달라 삭제 할 수 없습니다.",
        });
      }

      await this.commentService.delComment(userkey, commentkey);
      return res
        .status(200)
        .json({ result: true, message: "후기(댓글)을 삭제했습니다." });
    } catch (error) {
      console.log(error);

      return res
        .status(401)
        .json({ result: false, errormessage: "댓글 삭제에 실패하셨습니다" });
    }
  };

  //후기(댓글) 상세불러오기(상세조회) /api/comment/:itemkey/star
  //각 댓글의 평점(별점)을 모아 댓글 상세페이지에 보여주기
  starPoint = async (req, res, next) => {
    const { itemkey } = req.params;

    const avgStardata = await this.commentService.avgStar(itemkey);

    const commentData = await this.commentService.getComment(itemkey);
    
    console.log(avgStardata);
    console.log(commentData);
    res.status(201).json({
      data: commentData.map((e) => {
        return {
          commentkey: e.commentkey,
          comment: e.comment,
          star: e.star,
          userkey: e.userkey,
          itemkey: e.itemkey,
        };
      }),
      star: avgStardata,
    });
    return;
  };




  
}

//target = comment , regex = regexComment  검사할 target 정규표현식 regex
//유효성 판별   .serch 실패한검색-1 성공한검색 양수값
function isRegexValidation(target, regex) {
  return target.search(regex) !== -1; //실패하지 않았을시~
}

//에러 검출 코드
//console.log(`${req.method} ${req.originalUrl} : ${err.message}`);
// return res.status(401).json({err:err.message});

module.exports = CommentController;
