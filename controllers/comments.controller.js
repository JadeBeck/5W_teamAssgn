const CommentService = require('../services/comments.service')

// Post의 컨트롤러(Controller)역할을 하는 클래스
class CommentsController {
    commentService = new CommentService(); // Post 서비스 클래스를/컨트롤러 클래스의/멤버 변수로 할당

    getComments = async (req, res, next) => {  //①getPosts 메소드
        // 서비스 계층에 구현된 findAllPost 로직을 실행합니다.
        const { postId } = req.params;
        const comments = await this.commentService.findAllComments(postId);  //PostsController 클래스에서 멤버 변수로 정의한 postService에서 findAllPost 메소드를 실행하고 그 결괏값을 posts라는 변수에 할당하는 코드
        res.status(200).json({data: comments})  //위에서 할당한 결괏값을 사용자에게 리턴하는 코드
    }

    createComment = async (req, res, next) => {  //②createPost 메소드
        const { postId } = req.params;
        const { nickname, comment, password } = req.body;  //body 데이터를 객체구조분해할당해서 4개의 인자들을 변수로 선언
        // 서비스 계층에 구현된 createPost 로직을 실행합니다.
        const createCommentData = await this.commentService.createComment(postId, nickname, comment, password);  //위의 인자들을 createPost라는 로직으로 구현, 로직 실행 후 결괏값을 createPostData라는 변수에 할당하고
        res.status(201).json({data: createCommentData});  //할당값을 http 스테이러스 코드 201로 사용자에게 리턴
    }

    updateComment = async (req, res, next) => {
        const { commentId } = req.params;
        const { nickname, comment, password } = req.body;
        const updateComment = await this.commentService.updateComment(
            commentId,
            nickname,
            comment,
            password
        );
        res.status(200).json({data: updateComment});
    };

    deleteComment = async (req, res, next) => {
        const { commentId } = req.params;
        const { password } = req.body;
        const deleteComment = await this.commentService.deleteComment(commentId, password);
        res.status(200).json({data: deleteComment});
    };
}

module.exports = CommentsController;