const express = require("express");
const router = express.Router();
const { Item, User, Comment, Like } = require("../models");
const AuthMiddleware = require("../middlewares/auth_middlewares");

// 찜하기(좋아요) 등록, 취소
router.post("/:itemkey", AuthMiddleware, async (req, res) => {
  try {
    const { userkey } = res.locals.user.userkey;
    const { itemkey } = req.params;

    const thisitem = await Item.findOne({ where: { itemkey } });

    if (thisitem === null) {
      res.status(400).json({
        result: false,
        errormessage: "해당 숙소를 찾을 수 없습니다.",
      });
      return;
    } else {
      const likeitem = await Like.findOne({ where: { itemkey, userkey } });

      if (!likeitem) {
        await Like.create({ userkey, itemkey });
        const userlike = await Like.findAll({
          where: { userkey },
          attributes: ["itemkey"],
        });
        console.log(userlike);
        res.status(200).json({
          result: true,
          message: "찜하기 등록",
          like: userlike.map((e) => {
            return e.itemkey;
          }),
        });
        return;
      } else {
        await Like.destroy({ where: { userkey, itemkey } });
        const userlike = await Like.findAll({
          where: { userkey },
          attributes: ["itemkey"],
        });
        console.log(userlike);
        res.status(200).json({
          result: true,
          message: "찜하기 취소",
          like: userlike.map((e) => {
            return e.itemkey;
          }),
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

// 위시리스트 보여주기(찜한것들)
router.get("/", AuthMiddleware, async (req, res) => {
  try {
    const { userkey } = res.locals.user.userkey;

    const datas = await Like.findAll({
      include: [
        {
          model: Item,
        },
      ],
      order: [["itemkey", "DESC"]],
      where: { userkey },
    });

    const arr = datas.map((e) => {
      return e.Item;
    });

    const arr2 = arr.map((e) => {
      return {
        itemkey: e.itemkey,
        title: e.title,
        img: e.img,
      };
    });

    res.status(200).json({
      data: arr2,
    });
    return;
  } catch (err) {
    console.log(err);
    res.status(400).json({
      result: false,
      errormessage: "위시리스트를 불러오지 못했습니다.",
    });
    return;
  }
});

module.exports = router;



































/**
 * @swagger
 *  /api/{itemkey}:
 *    post:
 *      tags:
 *      - Like
 *      description: 찜하기(좋아요) 등록, 취소
 *      operationId : itemkey
 *      parameters:
 *      - in: "body"
 *        name: "itemkey"
 *        description: 찜하기(좋아요) 등록, 취소 
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            likekey:
 *              type: integer
 *              example: '1'
 *            userkey:
 *              type: integer
 *              example: '1'
 *            itemkey:
 *              type: integer
 *              example: '1'
 * 
 *      responses:
 *        200-1:
 *          description: "찜하기 등록"
 *        200-2:
 *          description: "찜하기 취소"
 *        400-1:
 *          description: "해당 숙소를 찾을 수 없습니다."
 *        400-2:
 *          description: "찜하기 기능에 에러가 발생했습니다."
 */