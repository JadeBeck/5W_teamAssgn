const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middlewares");

const LikeController = require('../controllers/like.controller');  //⭐
const likeController = new LikeController();  //⭐PostsController에 대한 클래스 선언해서 postsController에 담음

router.get('/posts/like', authMiddleware, likeController.getLikedPosts); //❤
router.put('/posts/:postId/like', authMiddleware, likeController.updateLike);  //❤

module.exports = router;