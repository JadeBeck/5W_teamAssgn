const PostService = require('../services/posts.service');

// Post의 컨트롤러(Controller)역할을 하는 클래스
class PostsController {
    postService = new PostService(); // Post 서비스 클래스를/컨트롤러 클래스의/멤버 변수로 할당

    getPosts = async (req, res, next) => {  //①getPosts 메소드
        // 서비스 계층에 구현된 findAllsPost 로직을 실행합니다.
        const posts = await this.postService.findAllPosts();  //PostsController 클래스에서 멤버 변수로 정의한 postService에서 findAllPosts 메소드를 실행하고 그 결괏값을 posts라는 변수에 할당하는 코드
        res.status(200).json({data: posts})  //위에서 할당한 결괏값을 사용자에게 리턴하는 코드
    }

    getPostById = async (req, res, next) => {
        const {postId} = req.params
        const post = await this.postService.findPostById(postId);
        res.status(200).json({data: post});
    };

    createPost = async (req, res, next) => {  //②createPost 메소드
        const {nickname, password, title, content} = req.body;  //body 데이터를 객체구조분해할당해서 4개의 인자들을 변수로 선언
        // 서비스 계층에 구현된 createPost 로직을 실행합니다.
        const createPostData = await this.postService.createPost(nickname, password, title, content);  //위의 인자들을 createPost라는 로직으로 구현, 로직 실행 후 결괏값을 createPostData라는 변수에 할당하고
        res.status(201).json({data: createPostData});  //할당값을 http 스테이러스 코드 201로 사용자에게 리턴
    }

    updatePost = async (req, res, next) => {
        const { postId } = req.params;
        const { password, title, content } = req.body;
        const updatePost = await this.postService.updatePost(
            postId,
            password,
            title,
            content
        );
        res.status(200).json({data: updatePost});
    };

    deletePost = async (req, res, next) => {
        const { postId } = req.params;
        const { password } = req.body;
        const deletePost = await this.postService.deletePost(postId, password);
        res.status(200).json({data: deletePost});
    };
}

module.exports = PostsController;