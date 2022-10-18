const express = require('express');
const router = express.Router();

const CommentsController = require('../controllers/comments.controller');
const commentsController = new CommentsController();

router.get('/comments/:postId', commentsController.getComments);
router.post('/comments/:postId', commentsController.createComment);
router.put('/comments/:commentId', commentsController.updateComment);
router.delete('/comments/:commentId', commentsController.deleteComment);

module.exports = router;