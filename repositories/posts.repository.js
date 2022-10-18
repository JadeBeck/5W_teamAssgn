// repositories/posts.repository.js

const { Posts } = require('../models');  //⓪models 안의 Posts 모듈을 가져옴. 왜? 이 repository에서 sequelize를 통해서 Posts 테이블에 접근을 하기 위해서

class PostRepository {
    findAllPosts = async () => {  //①findAllPost메소드와
        const posts = await Posts.findAll();  //⓪에서 가져온 Posts에서 실제 db에 접근하여 데이터 사용. Posts 라는 모델에서 findAll 이용해서 데이터(게시글) 몽땅 찾아서 posts란 변수에 할당 후
        return posts;  //걔를 리턴
    }

    findPostById = async (postId) => {
        const post = await Posts.findByPk(postId);
        return post;
    };

    createPost = async (nickname, password, title, content) => {
        const createPostData = await Posts.create({nickname, password, title, content});
        return createPostData;
    }

    updatePost = async (postId, password, title, content) => {
        const updatePostData = await Posts.update({title, content}, {where: {postId, password}}
        );
        return updatePostData;
    };

    deletePost = async (postId, password) => {
        const updatePostData = await Posts.destroy({where: {postId, password}});
        return updatePostData;
    };

    getLikedPosts = async (arrPostId) => {
        const likedPosts = await Posts.findAll({where: {postId: arrPostId}})
        return likedPosts;
    }

    plusLikesNum = async (postId) =>{
        const post = await Posts.findByPk(postId);
        const likesNum = (post.likes) *1 + 1;
        const plusLikesNumData = await Posts.update({likes: likesNum}, {where: {postId}});
        return plusLikesNumData;
    }

    minusLikesNum = async (postId) =>{
        const post = await Posts.findByPk(postId);
        const likesNum = (post.likes) *1 - 1;
        const minusLikesNumData = await Posts.update({likes: likesNum}, {where: {postId}});
        return minusLikesNumData;
    }

}

module.exports = PostRepository;