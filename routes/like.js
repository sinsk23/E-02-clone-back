const express = require("express");
const router = express.Router();
const { Item, User, Comment, Like } = require("../models");

// 찜하기(좋아요) 등록, 취소
router.post("/:itemkey", async (req, res) => {
  try {
    // const { userkey } = res.locals.user;

    const userkey = 1; // 임시
    const { itemkey } = req.params;

    const thisitem = await Item.findOne({ where: { itemkey } });

    if (thisitem === null) {
      res.status(400).json({
        result: false,
        errormessage: "해당 숙소를 찾을 수 없습니다.",
      });
      return;
    } else {
      const likeitem = await Like.findOne({ where: { itemkey } });

      if (!likeitem) {
        await Like.create({ userkey, itemkey });
        res.status(200).json({
          result: true,
          message: "찜하기 등록",
        });
        return;
      } else {
        await Like.destroy({ where: { userkey, itemkey } });
        res.status(200).json({
          result: true,
          message: "찜하기 취소",
        });
        return;
      }
    }
  } catch (err) {
    res.status(400).json({
      result: false,
      errormessage: "찜하기 기능에 에러가 발생했습니다.",
    });
    return;
  }
});

module.exports = router;
