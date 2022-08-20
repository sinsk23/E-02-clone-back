const express = require("express");
const router = express.Router();
const { Item, User, Comment, Like } = require("../models");
const AuthMiddleware = require("../middlewares/auth_middlewares");
const VerifyMiddleware = require("../middlewares/verify_middlewares");

// 숙소 모두 보여주기(메인페이지)(평점 어캐보여주지..)
router.get("/", VerifyMiddleware, async (req, res) => {
  try {
    const datas = await Item.findAll({
      include: {
        model: User,
        attributes: ["nickname"],
      },
    });

    const user = res.locals.user;
    if (user) {
      const likeitems = await Like.findAll({
        where: { userkey: user.userkey },
      });

      res.status(200).json({
        data: datas.map((e) => {
          return {
            itemkey: e.itemkey,
            title: e.title,
            img: e.img,
            content: e.content,
            category: e.category,
            price: e.price,
            location: e.location,
            star: 0,
            auth: e.User.nickname,
          };
        }),
        likes: likeitems.map((i) => {
          return i.itemkey;
        }),
      });
    } else {
      res.status(200).json({
        data: datas.map((e) => {
          return {
            itemkey: e.itemkey,
            title: e.title,
            img: e.img,
            content: e.content,
            category: e.category,
            price: e.price,
            location: e.location,
            star: 0,
            auth: e.User.nickname,
          };
        }),
        likes: [],
      });
    }

    // 각 게시물 안에 star 값을 배열로 드릴수 있음
    // const comments = datas.map((e) => {
    //   return Comment.findAll({
    //     where: { itemkey: e.itemkey },
    //     attributes: ["star", "itemkey"],
    //   });
    // });

    // Promise.all(comments).then((value) => {
    //   res.status(200).json({
    //     data: datas.map((e, i) => {
    //       // let aa = value[i].length;

    //       return {
    //         itemkey: e.itemkey,
    //         title: e.title,
    //         img: e.img,
    //         content: e.content,
    //         category: e.category,
    //         price: e.price,
    //         location: e.location,
    //         star: value[i],
    //         auth: e.User.nickname,
    //       };
    //     }),
    //   });
    // });

    // like 처럼 따로 키 벨류 값으로 드리기

    // const comments = datas.map((e) => {
    //   return Comment.findAll({
    //     where: { itemkey: e.itemkey },
    //     attributes: ["star", "itemkey"],
    //   });
    // });
    // let sumStar = 0;
    // let avg2 = 0;
    // Promise.all(comments).then((value) => {
    //   // console.log(value);
    //   const arr = value.map((i) => {
    //     console.log(i);
    //   });

    //   res.status(200).json({
    //     ok: false,
    //   });
    //   return;
    // });

    //  sd

    // sumStar = 0;
    // avg2 = 0;
    // if (value[i] === []) {
    // } else {
    //   for (let i = 0; i < value[i].length; i++) {
    //     sumStar += value[i].star;
    //   }
    //   avg2 = sumStar / value.length;
    // }

    // const aaa = value.map((e, i) => {
    //   console.log(e[i]);
    //   return {
    //     itemkey: e.itemkey,
    //     star: e.star,
    //   };
    // });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      result: false,
      errormessage: "숙소를 불러오지 못하였습니다",
    });
    return;
  }
});

// 숙소 생성하기(미들웨어 적용해야함)
router.post("/", AuthMiddleware, async (req, res) => {
  try {
    const { userkey } = res.locals.user.userkey;

    const { title, img, content, category, price, location } = req.body;

    if (
      title === "" ||
      img === "" ||
      category === "" ||
      content === "" ||
      price === "" ||
      location === ""
    ) {
      res.status(400).json({
        result: false,
        errormessage: "항목들을 모두 입력해주세요.",
      });
      return;
    }

    const item = await Item.create({
      title,
      img,
      content,
      category,
      price,
      location,
      userkey,
    });

    const nic = await User.findOne({ where: { userkey: item.userkey } });

    res.status(201).json({
      data: {
        itemkey: item.itemkey,
        title: item.title,
        img: item.img,
        content: item.content,
        category: item.category,
        price: item.price,
        location: item.location,
        star: 0,
        auth: nic.nickname,
      },
    });
    return;
  } catch (err) {
    console.log(err);
    res.status(400).json({
      result: false,
      errormessage: "숙소 등록에 실패하였습니다.",
    });
    return;
  }
});

// 숙소 상세 페이지 보여주기
router.get("/:itemkey", VerifyMiddleware, async (req, res) => {
  try {
    const { itemkey } = req.params;
    const data = await Item.findOne({
      where: { itemkey },
      include: {
        model: User,
        attributes: ["nickname"],
      },
    });

    if (data === null) {
      res.status(400).json({
        result: false,
        errormessage: "해당 숙소를 찾을 수 없습니다.",
      });
      return;
    }

    const comments = await Comment.findAll({
      where: { itemkey },
      attributes: ["star"],
    });

    let sumStar = 0;
    let avg2 = 0;
    if (comments[0] === undefined) {
    } else {
      for (let i = 0; i < comments.length; i++) {
        sumStar += comments[i].star;
      }
      avg2 = sumStar / comments.length;
      avg2 = Math.round(avg2 * 10) / 10;
    }

    const user = res.locals.user;

    if (user) {
      const likeitem = await Like.findOne({
        where: { userkey: user.userkey, itemkey },
      });
      let likevalue = false;
      if (likeitem) {
        likevalue = true;
      }

      res.status(200).json({
        data: {
          itemkey: data.itemkey,
          title: data.title,
          img: data.img,
          content: data.content,
          category: data.category,
          price: data.price,
          location: data.location,
          star: avg2,
          like: likevalue,
          auth: data.User.nickname,
        },
      });
      return;
    } else {
      res.status(200).json({
        data: {
          itemkey: data.itemkey,
          title: data.title,
          img: data.img,
          content: data.content,
          category: data.category,
          price: data.price,
          location: data.location,
          star: avg2,
          like: false,
          auth: data.User.nickname,
        },
      });
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      result: false,
      errormessage: "숙소 상세 정보를 불러오지 못하였습니다.",
    });
    return;
  }
});

// 숙소 수정하기
router.put("/:itemkey", AuthMiddleware, async (req, res) => {
  try {
    const { userkey } = res.locals.user.userkey;

    const { itemkey } = req.params;
    const { title, img, content, category, price, location } = req.body;

    if (
      title === "" ||
      img === "" ||
      category === "" ||
      content === "" ||
      price === "" ||
      location === ""
    ) {
      res.status(400).json({
        result: false,
        errormessage: "항목들을 모두 입력해주세요.",
      });
      return;
    }

    const data = await Item.findOne({
      where: { itemkey },
    });

    if (data === null) {
      res.status(400).json({
        result: false,
        errormessage: "해당 숙소를 찾을 수 없습니다.",
      });
      return;
    } else {
      if (userkey === data.userkey) {
        await Item.update(
          {
            title,
            img,
            content,
            category,
            price,
            location,
          },
          { where: { itemkey } }
        );
        res.status(200).json({
          result: true,
          message: "숙소를 수정했습니다.",
        });
        return;
      } else {
        res.status(400).json({
          result: false,
          errormessage: "호스트가 일치 하지 않습니다.",
        });
        return;
      }
    }
  } catch (err) {
    res.status(400).json({
      result: false,
      errormessage: "숙소 수정에 실패하였습니다.",
    });
    return;
  }
});

// 숙소 삭제하기
router.delete("/:itemkey", AuthMiddleware, async (req, res) => {
  try {
    const { userkey } = res.locals.user.userkey;

    const { itemkey } = req.params;

    const data = await Item.findOne({
      where: { itemkey },
    });

    if (data === null) {
      res.status(400).json({
        result: false,
        errormessage: "해당 숙소를 찾을 수 없습니다.",
      });
      return;
    } else {
      if (userkey === data.userkey) {
        await Item.destroy({ where: { itemkey } });
        res.status(200).json({
          result: true,
          message: "숙소를 삭제했습니다.",
        });
        return;
      } else {
        res.status(400).json({
          result: false,
          errormessage: "호스트가 일치 하지 않습니다.",
        });
        return;
      }
    }
  } catch (err) {
    res.status(400).json({
      result: false,
      errormessage: "숙소 삭제에 실패하였습니다.",
    });
    return;
  }
});

module.exports = router;
