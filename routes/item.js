const express = require("express");
const router = express.Router();
const { Item, User, Comment, Like } = require("../models");
const AuthMiddleware = require("../middlewares/auth_middlewares");
const VerifyMiddleware = require("../middlewares/verify_middlewares");
const { Op } = require("sequelize");

// 숙소 모두 보여주기(메인페이지)
router.get("/", VerifyMiddleware, async (req, res) => {
  try {
    const datas = await Item.findAll({
      include: [
        {
          model: User,
          attributes: ["nickname"],
        },
        {
          model: Comment,
          attributes: ["star"],
        },
        {
          model: Like,
          attributes: ["userkey"],
        },
      ],
      order: [["itemkey", "DESC"]],
    });

    const arr = datas.map((e) => {
      return {
        itemkey: e.itemkey,
        title: e.title,
        img: e.img,
        category: e.category,
        price: e.price,
        location: e.location,
        star: e.Comments,
        like: e.Likes,
        auth: e.User.nickname,
      };
    });

    const user = res.locals.user;
    if (user) {
      // 로그인 했을때 메인에 좋아요 게시물 데이터 주기
      const likeitems = await Like.findAll({
        where: { userkey: user.userkey },
      });

      res.status(200).json({
        likes: likeitems.map((i) => {
          return i.itemkey;
        }),
        data: arr,
      });
    } else {
      // 비로그인이면 메인에 좋아요 게시물 데이터 없음
      res.status(200).json({
        likes: [],
        data: arr,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      result: false,
      errormessage: "숙소를 불러오지 못하였습니다",
    });
    return;
  }
});

// // 네비게이션 테스트
// router.get("/", VerifyMiddleware, async (req, res) => {
//   try {
//     // const page = parseInt(req.query.page);
//     // const pageSize = parseInt(req.query.pageSize); // 프론트랑 말해서 5로 고정해도됨

//     // let start = 0;
//     // if (page <= 0) {
//     //   page = 1;
//     // } else {
//     //   start = (page - 1) * pageSize;
//     // }

//     let where = {};
//     if (req.query.lastkey) {
//       // 맨처음 n개 가져오고 이후 스크롤 할때 lastkey을 넣어서 보내줌(그럼 그거보다 작은 애들을 조건으로 함)
//       const lastkey = parseInt(req.query.lastkey);
//       where = { itemkey: { [Op.lt]: lastkey } };
//     }

//     // 처음엔 조건없이 3개 가져오고 이후엔 lastkey 값보다 작은 조건으로 3개 가져옴
//     const datas = await Item.findAll({
//       where,
//       include: [
//         {
//           model: User,
//           attributes: ["nickname"],
//         },
//         {
//           model: Comment,
//           attributes: ["star"],
//         },
//         {
//           model: Like,
//           attributes: ["userkey"],
//         },
//       ],
//       order: [["itemkey", "DESC"]],
//       limit: 3,
//       // offset: start,
//     });

//     const arr = datas.map((e) => {
//       return {
//         itemkey: e.itemkey,
//         title: e.title,
//         img: e.img,
//         category: e.category,
//         price: e.price,
//         location: e.location,
// itemType: e.itemType,
// itemSize: e.itemSize,
// guestRoom: e.guestRoom,
// convenience: e.convenience,
//         star: e.Comments,
//         like: e.Likes,
//         auth: e.User.nickname,
//       };
//     });

//     const user = res.locals.user;
//     if (user) {
//       // 로그인 했을때 메인에 좋아요 게시물 데이터 주기
//       const likeitems = await Like.findAll({
//         where: { userkey: user.userkey },
//       });

//       res.status(200).json({
//         likes: likeitems.map((i) => {
//           return i.itemkey;
//         }),
//         data: arr,
//       });
//     } else {
//       // 비로그인이면 메인에 좋아요 게시물 데이터 없음
//       res.status(200).json({
//         likes: [],
//         data: arr,
//       });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({
//       result: false,
//       errormessage: "숙소를 불러오지 못하였습니다",
//     });
//     return;
//   }
// });

// 숙소 생성하기(미들웨어 적용해야함)
router.post("/", AuthMiddleware, async (req, res) => {
  try {
    const { userkey } = res.locals.user.userkey;

    const {
      title,
      img,
      content,
      category,
      price,
      location,
      itemType,
      itemSize,
      guestRoom,
      convenience,
    } = req.body;

    if (
      title === "" ||
      img === "" ||
      category === "" ||
      content === "" ||
      price === "" ||
      location === "" ||
      itemType === "" ||
      itemSize === "" ||
      guestRoom === "" ||
      convenience === ""
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
      itemType,
      itemSize,
      guestRoom,
      convenience,
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
        itemType: item.itemType,
        itemSize: item.itemSize,
        guestRoom: item.guestRoom,
        convenience: item.convenience,
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
          itemType: data.itemType,
          itemSize: data.itemSize,
          guestRoom: data.guestRoom,
          convenience: data.convenience,
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
          itemType: data.itemType,
          itemSize: data.itemSize,
          guestRoom: data.guestRoom,
          convenience: data.convenience,
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
    const {
      title,
      img,
      content,
      category,
      price,
      location,
      itemType,
      itemSize,
      guestRoom,
      convenience,
    } = req.body;

    if (
      title === "" ||
      img === "" ||
      category === "" ||
      content === "" ||
      price === "" ||
      location === "" ||
      itemType === "" ||
      itemSize === "" ||
      guestRoom === "" ||
      convenience === ""
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
            itemType,
            itemSize,
            guestRoom,
            convenience,
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
















































































/**
 * @swagger
 *  /api:
 *    get:
 *      tags:
 *      - Item
 *      description: 숙소 모두 보여주기(메인페이지)
 *      operationId : 
 *      parameters:
 *      - in: "path"
 *        name: ""
 *        description: "숙소 모두 보여주기(메인페이지)"
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            itemkey:
 *              type: integer
 *              example: '1'
 *            title:
 *              type: string
 *              example: '게시글 제목'
 *            img:
 *              type: string
 *            category:
 *            price:
 *              type: integer
 *              example: '3000'
 *            location:
 *              type: string
 *            star:
 *              type: integer
 *              example: '4.5'
 *            like:
 *            auth:  
 *              
 * 
 *            
 *      responses:
 *        200:
 *        400:
 *          description: "숙소를 불러오지 못하였습니다"
 *        
 *        
 *        
 */





/**
 * @swagger
 *  /api:
 *    post:
 *      tags:
 *      - Item
 *      description: 숙소 생성하기
 *      operationId : 
 *      parameters:
 *      - in: "path"
 *        name: ""
 *        description: "호스트만 숙소 생성하기"
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            title:
 *              type: string
 *              example: '게시글 제목'
 *            img:             
 *            content:
 *              type: string
 *              example: '게시글 내용'
 *            category:
 *            price:
 *              type: integer
 *              example: '3000'
 *            location:
 *              type: string
 *            itemType:
 *            itemSize:
 *            guestRoom:
 *            convenience:  
 *              
 * 
 *            
 *      responses:
 *        200:
 *        400-1:
 *          description: "항목들을 모두 입력해주세요."
 *        400-2:
 *          description: "숙소 등록에 실패하였습니다."
 *        
 *        
 *        
 */



/**
 * @swagger
 *  /api/{itemkey}:
 *    get:
 *      tags:
 *      - Item
 *      description: 숙소 상세 페이지 보여주기
 *      operationId : 
 *      parameters:
 *      - in: "path"
 *        name: ""
 *        description: "숙소 상세 페이지 보여주기"
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            itemkey:
 *            title:
 *              type: string
 *              example: '게시글 제목'
 *            img:             
 *            content:
 *              type: string
 *              example: '게시글 내용'
 *            category:
 *            price:
 *              type: integer
 *              example: '3000'
 *            location:
 *              type: string
 *            itemType:
 *            itemSize:
 *            guestRoom:
 *            convenience:
 *            star:
 *            like:
 *            auth:  
 *              
 * 
 *            
 *      responses:
 *        200:
 *        400-1:
 *          description: "해당 숙소를 찾을 수 없습니다."
 *        400-2:
 *          description: "숙소 상세 정보를 불러오지 못하였습니다."
 *        
 *        
 *        
 *        
 */


/**
 * @swagger
 *  /api/{itemkey}:
 *    put:
 *      tags:
 *      - Item
 *      description: 숙소 수정하기
 *      operationId : 
 *      parameters:
 *      - in: "path"
 *        name: ""
 *        description: "숙소 수정하기"
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            itemkey:
 *            title:
 *              type: string
 *              example: '게시글 제목'
 *            img:             
 *            content:
 *              type: string
 *              example: '게시글 내용'
 *            category:
 *            price:
 *              type: integer
 *              example: '3000'
 *            location:
 *              type: string
 *            itemType:
 *            itemSize:
 *            guestRoom:
 *            convenience:
 *            
 *              
 * 
 *            
 *      responses:
 *        200:
 *          description:"숙소를 수정했습니다."
 *        400-1:
 *          description: "항목들을 모두 입력해주세요."
 *        400-2:
 *          description: "해당 숙소를 찾을 수 없습니다."
 *        400-3:
 *          description: "호스트가 일치 하지 않습니다."
 *        400-4:
 *          description: "숙소 수정에 실패하였습니다."
 *        
 *        
 *        
 *        
 */


/**
 * @swagger
 *  /api/{itemkey}:
 *    delete:
 *      tags:
 *      - Item
 *      description: 숙소 삭제하기
 *      operationId : 
 *      parameters:
 *      - in: "path"
 *        name: ""
 *        description: "숙소 삭제하기"
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            itemkey:
 *            
 *            
 *              
 * 
 *            
 *      responses:
 *        200:
 *          description: "숙소를 삭제했습니다."
 *        400-1:
 *          description: "해당 숙소를 찾을 수 없습니다."
 *        400-2:
 *          description: "호스트가 일치 하지 않습니다."
 *        400-3:
 *          description: "숙소 삭제에 실패하였습니다."
 *        
 *        
 *        
 *        
 */












