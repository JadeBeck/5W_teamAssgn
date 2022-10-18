const commentRepository = require('../repositories/comments.repository');  //서비스 계층은 실제로 db 안의 정보를 사용하며, 그러기 위해서는 하위 계층의 repository모듈을 호출.

class CommentService {
   commentRepository = new commentRepository();  //멤버 변수로 postRepository 선언, 그 변수는 postRepository 클래스를 만든 인스턴스

    findAllComments = async (postId) => {   //①findAllPost 메소드 하나
        const allComments = await this.commentRepository.findAllComments(postId);

        allComments.sort((a, b) => {
            return b.createdAt - a.createdAt;
        })

        // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
        return allComments.map(comment => {  //정렬된 데이터를 맵으로 가공 후 컨트롤러에 반환. 맵 실행하면 결과는 배열로 나오고, 거기다가 내부의 각각 하나의 데이터(postId 등)들은 큰 array 안의 각각의 post 객체에서 가져왔다(그니까.. password는 빼고 보여줘야 할 것 아님? 그거심)
            return {  //data 가공해서 컨트롤러에 전달 위한 부분
                postId: comment.postId,
                commentId: comment.commentId,
                nickname: comment.nickname,
                createdAt: comment.createdAt,
                updatedAt: comment.updatedAt
            }
        });
    }

    createComment = async (postId, nickname, password, comment) => {  //②createPost 메소드 둘. 네 개의 인자를 받아 실제로 post 생성함.
        // 저장소(Repository)에게 데이터를 요청합니다.
        const createCommentData = await this.commentRepository.createComment(postId, nickname, password, comment);  //받은 데이터로 바로 포스트 생성해버림. repository에 createPost라는 메소드 호출해서 실제로 단순하게 게시글 작성하는 문법. 작성된 결괏값을 createPostData에 할당

        // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
        return {  //createPostData를 이 로직으로 아래와 같이 가공하여 컨트롤러에 반환함.
            postId: createCommentData.postId,
            commentID: createCommentData.commentID,
            nickname: createCommentData.nickname,
            comment: createCommentData.comment,
            createdAt: createCommentData.createdAt,
            updatedAt: createCommentData.updatedAt,
        };
    }

    updateComment = async (commentId, nickname, comment, password) => {
        const findComment = await this.commentRepository.findCommentById(commentId);
        if (!findComment) throw new Error("Comment doesn't exist");

        await this.commentRepository.updateComment(commentId, nickname, comment, password);

        const updateComment = await this.commentRepository.findCommentById(commentId);

        return {
            commentId: updateComment.commentId,
            nickname: updateComment.nickname,
            comment: updateComment.comment,
            createdAt: updateComment.createdAt,
            updatedAt: updateComment.updatedAt,
        };
    };

    deleteComment = async (commentId, password) => {
        const findComment = await this.commentRepository.findCommentById(commentId);
        if (!findComment) throw new Error("Comment doesn't exist");

        await this.commentRepository.deleteComment(commentId, password);

        return {
            postId: findComment.postId,
            commentId: findComment.commentId,
            nickname: findComment.nickname,
            content: findComment.content,
            createdAt: findComment.createdAt,
            updatedAt: findComment.updatedAt,
        };
    };
}

module.exports = CommentService;