const express = require("express");
const router = express.Router();
const { Item, User, Comment } = require("../models");

// 숙소 모두 보여주기(메인페이지)(평점 어캐보여주지..)
router.get("/", async (req, res) => {
  try {
    const datas = await Item.findAll({
      include: {
        model: User,
        attributes: ["nickname"],
      },
    });
    // console.log(datas);

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
          //   star: e.asdf, // 나중에 배열로 바꿔서 돌려야하는데 흠.. 어렵네 이게
          auth: e.User.nickname,
        };
      }),
    });
  } catch (err) {
    res.status(400).json({
      result: false,
      errormessage: "숙소를 불러오지 못하였습니다",
    });
    return;
  }
});

// 숙소 생성하기(미들웨어 적용해야함)
router.post("/", async (req, res) => {
  try {
    // const { userkey } = res.locals.user;

    const {
      title,
      img,
      content,
      category,
      price,
      location,
      userkey /*임시 유저키*/,
    } = req.body;

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
      userkey, // 나중에 토큰에서 값 받을거임
    });
    console.log(item);

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
        auth: nic,
      },
    });
    return;
  } catch (err) {
    res.status(400).json({
      result: false,
      errormessage: "숙소 등록에 실패하였습니다.",
    });
    return;
  }
});

// 숙소 상세 페이지 보여주기
router.get("/:itemkey", async (req, res) => {
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
        auth: data.User.nickname,
      },
    });
    return;
  } catch (err) {
    res.status(400).json({
      result: false,
      errormessage: "숙소 상세 정보를 불러오지 못하였습니다.",
    });
    return;
  }
});

// 숙소 수정하기
router.put("/:itemkey", async (req, res) => {
  try {
    // const { userkey } = res.locals.user;

    const { itemkey } = req.params;
    const {
      title,
      img,
      content,
      category,
      price,
      location,
      userkey /*임시 유저키*/,
    } = req.body;

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
router.delete("/:itemkey", async (req, res) => {
  try {
    // const { userkey } = res.locals.user;
    const userkey = 1; // 임시

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
    console.log(err);
    res.status(400).json({
      result: false,
      errormessage: "숙소 삭제에 실패하였습니다.",
    });
    return;
  }
});

module.exports = router;
