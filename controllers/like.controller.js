const LikeService = require('../services/like.service');
const PostService = require('../services/posts.service');

class LikeController {
    likeService = new LikeService(); // Post 서비스 클래스를/컨트롤러 클래스의/멤버 변수로 할당

    getLikedPosts = async (req, res, next) => {
        const { nickname } = res.locals.user;
        const likedPosts = await this.likeService.getLikedPosts(nickname);
        res.status(200).json({data: likedPosts});
    };

    updateLike = async (req, res, next) => {
        const { postId } = req.params;
        const { nickname } = res.locals.user;
        const isLiked = await this.likeService.didILikeThis(postId, nickname);

        /*취소*/
        if (isLiked) {
            const cancelLike = await this.likeService.cancelLike(postId, nickname);
            res.status(200).json({data: cancelLike});
        }

        /*신규*/
        else {
            const addLike = await this.likeService.addLike(postId, nickname);
            res.status(200).json({data: addLike});
        }
    }
}

module.exports = LikeController;