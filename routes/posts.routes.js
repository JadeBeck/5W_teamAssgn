const express = require('express');
const router = express.Router();

const PostsController = require('../controllers/posts.controller');  //⭐
const postsController = new PostsController();  //⭐PostsController에 대한 클래스 선언해서 postsController에 담음

router.get('/posts', postsController.getPosts);  //⭐①getPosts 메소드로 연결; http 메소드가 겟이고, 기본  url로 들어왔을 때, postsController의 getPosts 메소드가 실행된다~!
router.get('/posts/:postId', postsController.getPostById); //❤
router.post('/posts', postsController.createPost);  //⭐②createPost 메소드로 연결
router.put('/posts/:postId', postsController.updatePost);  //❤
router.delete('/posts/:postId', postsController.deletePost); //❤

module.exports = router;