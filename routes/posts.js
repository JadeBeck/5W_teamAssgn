const express = require('express');
const router = express.Router();
const {Posts} = require("../models"); //⭐
const {Likes} = require("../models");  //⭐
const authMiddleware = require("../middlewares/auth-middlewares");


//1. 전체 게시글 목록 조회 API O
router.get("/posts", async (req, res) => {
    const item = await Posts.findAll({order: [["updatedAt", "DESC"]]})
    const mapItem = item.map((item) => {
        return {
            postId: item._id,
            nickname: item.nickname,
            title: item.title,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            likes: item.likes
        }
    })
    res.json({item: mapItem});
});


//6. 라잌 게시글 목록 조회 API O
router.get("/posts/like", authMiddleware, async (req, res) => {
    const { nickname } = res.locals.user;  //💛💛💛💛💛
    const arrLike = await Likes.findAll({ where: { nickname } })  //💛💛💛💛💛
    const arrPostId = arrLike.map((val) => {  //💛💛💛💛💛
        return val.postId  //postId만 리턴해서 배열한 것
    })

    const item = await Posts.findAll({ where: { postId: arrPostId }, order: [[ "likes", "DESC" ]]})   //💛💛💛💛💛
    const mapItem = item.map((item) => {
        return {
            postId: item.postId,
            nickname: item.nickname,
            title: item.title,  //findOne 관계 지어져 있으면 join으로 가져옴.. 여기 title을 그냥 써버리면 게시글 수정되면 반영이 안됨
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            likes: item.likes
        }
    })
    res.json({ item: mapItem/*, test: "test" */});
});


//7. 라잌/디스라잌 게시글 API O
router.put("/posts/:postId/like", authMiddleware, async (req, res) => {
        const { postId } = req.params;
        const { nickname } = res.locals.user;
        const is_liked = await Likes.findOne({ where: { postId, nickname } });
        console.log(is_liked)

        /*취소*/
        if (is_liked) {
            await Likes.destroy({ where:  { postId, nickname } } );
            const post = await Posts.findOne({ where: { postId } } );
            likesnum = (post.likes) * 1 - 1;
            await Posts.update({ likes: likesnum }, { where: { postId } });
            res.send({ result: "success", message: "게시글의 좋아요를 취소하였습니다." });
        }

        /*신규*/
        else {
            const post = await Posts.findOne({ where: { postId } });
            likesnum = (post.likes) * 1 + 1;
            await Likes.create({ postId, nickname });
            await Posts.update({ likes: likesnum }, { where: { postId } });
            res.send({result: "success", message: "게시글의 좋아요를 등록하였습니다."});
        }
    }
);


//2. 게시글 상세 조회 API O
router.get("/posts/:postId", async (req, res) => {
    const {postId} = req.params;
    const posts = await Posts.findAll({})
    const filteredPosts = posts.filter((item) => {
        return item["postId"].toString() === postId;
    });
    const mapPosts = filteredPosts.map((item) => {
        return {
            postId: item.postId,
            nickname: item.nickname,
            title: item.title,
            content: item.content,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            likes: item.likes
        }
    })
    res.json({mapPosts});
})


//3. 게시글 작성 API O
router.post("/posts", authMiddleware, async (req, res) => {
    try {
        const {user} = res.locals;
        const existPosts = await Posts.findAll({order: [["postId", "DESC"]]})

        if (existPosts.length !== 0) {
            postId = existPosts[0].postId + 1;
            await Posts.create({
                postId: postId,
                nickname: user.nickname,
                title: req.body.title,
                content: req.body.content,
                likes: 0
            });
            res.status(201).send({message: "게시글 작성에 성공하였습니다."});
        } else {
            await Posts.create({
                postId: 1,
                nickname: user.nickname,
                title: req.body.title,
                content: req.body.content,
                likes: 0
            });
            res.status(201).send({message: "게시글 작성에 성공하였습니다."});
        }
    } catch (Error) {
        return res.status(400).json({message: "게시글 작성에 실패하였습니다."});
    }
})


//4. 게시글 수정 API O
router.put("/posts/:postId", authMiddleware, async (req, res) => {
    const {postId} = req.params;
    const {content, title} = req.body;
    const existsPost = await Posts.findOne({where: {postId}});

    if (existsPost) {
        await Posts.update({ content, title }, { where: { postId } });
        res.send({result: "success", message: "게시글을 수정하였습니다."});
    } else {
        res.send({result: "fail"});
    }
})


//5. 게시글 삭제 API O
router.delete("/posts/:postId", authMiddleware, async (req, res) => {
    const {postId} = req.params;
    const existsPost = await Posts.findOne({ postId });
    if (existsPost) {
        await Posts.destroy({ where: { postId }});
        res.send({result: "success", message: "게시글을 삭제하였습니다."});
    } else {
        res.send({result: "fail"});
    }
})


module.exports = router;