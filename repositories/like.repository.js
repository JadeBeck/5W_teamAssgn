// repositories/posts.repository.js

const { Like } = require('../models');  //⓪models 안의 Posts 모듈을 가져옴. 왜? 이 repository에서 sequelize를 통해서 Posts 테이블에 접근을 하기 위해서

class LikeRepository {
    getLikedPosts = async (nickname) => {
        const likedPosts = await Like.findAll({ where: { nickname } })
        return likedPosts;
    }

    didILikeThis = async (postId, nickname) => {
        const hereItIs = await Like.findOne({ where: { postId, nickname } });
        return hereItIs;
    };

    addLike = async (postId, nickname) => {
        const updateLikeData = await Like.create({ postId, nickname });
        return updateLikeData;
    };

    cancelLike = async (postId, nickname) => {
        const updateLikeData = await Like.destroy({where: {postId, nickname}});
        return updateLikeData;
    };
}

module.exports = LikeRepository;