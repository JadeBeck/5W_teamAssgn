const express = require('express');
const router = express.Router();
const {Comments} = require("../models")
const authMiddleware = require("../middlewares/auth-middlewares");


//1. 댓글 목록 조회 API O
router.get("/comments/:postId", async (req, res) => {
    const { postId } = req.params;
    const existPosts = await Comments.findAll({where: {postId}, order: [["updatedAt", "DESC"]]})
    const mapComments = existPosts.map((item) => {
        return {
            postId: item.postId,
            commentId: item.commentId,
            nickname: item.nickname,
            comment: item.comment,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt
        }
    })
    res.json({mapComments});
});


//2. 댓글 작성 O
router.post("/comments/:postId", authMiddleware, async (req, res) => {
    const { postId } = req.params;
    const { user } = res.locals;
    if (req.body.comment === "") {
        res.status(400).json({success: false, errorMessage: "댓글 내용을 입력해주세요"});
    } else {
        await Comments.create({
            postId: postId,
            nickname: user.nickname,
            comment: req.body.comment
        });
        res.status(201).send({message: "댓글 등록이 완료되었습니다."});
    }
})


//3. 댓글 수정 O
router.put("/comments/:commentId", authMiddleware, async (req, res) => {
    try {
        const { commentId } = req.params;
        const { nickname } = res.locals.user;
        const { comment } = req.body;
        const existsComment = await Comments.findOne({where: {commentId, nickname}});
        if (comment === "") {
            res.status(400).json({success: false, errorMessage: "댓글 내용을 입력해주세요"});
        }
        if (existsComment) {
            await Comments.update({ comment }, {where: { commentId, nickname }});
            res.send({message: "댓글을 수정하였습니다."})
        } else {
            res.status(400).json({
                success: false, errorMessage: "본인의 댓글만 수정할 수 있어요!"
            })
        }
    } catch (e) {
        return res.status(400).json({success: false});
    }
})


//4. 댓글 삭제 O
router.delete("/comments/:commentId", authMiddleware, async (req, res) => {
    try {
        const { commentId } = req.params;
        const { nickname } = res.locals.user;
        const existsComment = await Comments.findOne({where: { commentId, nickname }});
        if (existsComment) {
            await Comments.destroy({where: { commentId }});
            res.send({result: "success", message: "댓글을 삭제하였습니다."});
        } else {
            res.status(400).json({success: false, errorMessage: "본인의 댓글만 삭제할 수 있어요!"});
        }
    } catch (e) {
        return res.status(400).json({ result: "fail" });
    }
})


module.exports = router;