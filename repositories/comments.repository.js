const { Comments } = require('../models');  //⓪models 안의 Posts 모듈을 가져옴. 왜? 이 repository에서 sequelize를 통해서 Posts 테이블에 접근을 하기 위해서

class CommentRepository {
    findAllComments = async (postId) => {
        const comments = await Comments.findAll({where: {postId}});
        return comments;
    }

    findCommentById = async (commentID) => {
        const comment = await Comments.findByPk(commentID);
        return comment;
    }

    createComment = async (postId, nickname, comment, password) => {
        const createCommentData = await Comments.create({postId, nickname, comment, password});
        return createCommentData;
    }

    updateComment = async (commentId, nickname,  comment, password) => {
        const updateCommentData = await Comments.update({ comment }, {where: {commentId, nickname, password}}
        );
        return updateCommentData;
    };

    deleteComment = async (commentId, password) => {
        const updateCommentData = await Comments.destroy({where: {commentId, password}});
        return updateCommentData;
    };
}

module.exports = CommentRepository;