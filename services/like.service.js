const LikeRepository = require('../repositories/like.repository');  //서비스 계층은 실제로 db 안의 정보를 사용하며, 그러기 위해서는 하위 계층의 repository모듈을 호출.
const PostRepository = require('../repositories/posts.repository');

class LikeService { //PostService 클래스 내부에
    likeRepository = new LikeRepository();
    postRepository = new PostRepository();
    //멤버 변수로 postRepository 선언, 그 변수는 postRepository 클래스를 만든 인스턴스

    getLikedPosts = async (nickname) => {
        const likedPosts = await this.likeRepository.getLikedPosts(nickname);
        const arrPostId = likedPosts.map((post) => {
            return post.postId;
        })
       // const forPostId
        const getLikedPosts = await this.postRepository.getLikedPosts(arrPostId);

        const mapPosts = getLikedPosts.map((post) => {
            return {
                postId: post.postId,
                nickname: post.nickname,
                title: post.title,
                likes: post.likes,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt,
            }
        })
        return mapPosts;
    };

    didILikeThis = async (postId, nickname) => {
        const likedOrNot = await this.likeRepository.didILikeThis(postId, nickname);
        return likedOrNot
    };

    addLike = async (postId, nickname) => {
        await this.likeRepository.addLike(postId, nickname);
        await this.postRepository.plusLikesNum(postId);
        return ("좋아요 등록");
    };

    cancelLike = async (postId, nickname) => {
        await this.likeRepository.cancelLike(postId, nickname);
        await this.postRepository.minusLikesNum(postId);
        return ("좋아요 취소");
    };
}

module.exports = LikeService;