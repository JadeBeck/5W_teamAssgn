const PostRepository = require('../repositories/posts.repository');  //서비스 계층은 실제로 db 안의 정보를 사용하며, 그러기 위해서는 하위 계층의 repository모듈을 호출.

class PostService { //PostService 클래스 내부에
    postRepository = new PostRepository();  //멤버 변수로 postRepository 선언, 그 변수는 postRepository 클래스를 만든 인스턴스

    findAllPosts = async () => {   //①findAllPost 메소드 하나
        // 저장소(Repository)에게 데이터를 요청합니다.
        const allPosts = await this.postRepository.findAllPosts();  //레파지토리에서 findAllPost라는 메소드 실행해서 가져온 데이터들을 allPost라는 변수에 할당함

        // 호출한 Post들을 가장 최신 게시글 부터 정렬합니다.
        allPosts.sort((a, b) => {  //그리고 위에서 repository에서 가져온 모든 게시글들을 정렬함
            return b.createdAt - a.createdAt;
        })

        // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
        return allPosts.map(post => {  //정렬된 데이터를 맵으로 가공 후 컨트롤러에 반환. 맵 실행하면 결과는 배열로 나오고, 거기다가 내부의 각각 하나의 데이터(postId 등)들은 큰 array 안의 각각의 post 객체에서 가져왔다(그니까.. password는 빼고 보여줘야 할 것 아님? 그거심)
            return {  //data 가공해서 컨트롤러에 전달 위한 부분
                postId: post.postId,
                nickname: post.nickname,
                title: post.title,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt
            }
        });
    }

    findPostById = async (postId) => {
        const post = await this.postRepository.findPostById(postId);
        return {  //data 가공해서 컨트롤러에 전달 위한 부분
            postId: post.postId,
            nickname: post.nickname,
            title: post.title,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt
        };
    };

    createPost = async (nickname, password, title, content) => {  //②createPost 메소드 둘. 네 개의 인자를 받아 실제로 post 생성함.
        // 저장소(Repository)에게 데이터를 요청합니다.
        const createPostData = await this.postRepository.createPost(nickname, password, title, content);  //받은 데이터로 바로 포스트 생성해버림. repository에 createPost라는 메소드 호출해서 실제로 단순하게 게시글 작성하는 문법. 작성된 결괏값을 createPostData에 할당

        // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
        return {  //createPostData를 이 로직으로 아래와 같이 가공하여 컨트롤러에 반환함.
            postId: createPostData.null,
            nickname: createPostData.nickname,
            title: createPostData.title,
            content: createPostData.content,
            createdAt: createPostData.createdAt,
            updatedAt: createPostData.updatedAt,
        };
    }

    updatePost = async (postId, password, title, content) => {
        const findPost = await this.postRepository.findPostById(postId);
        if (!findPost) throw new Error("Post doesn't exist");

        await this.postRepository.updatePost(postId, password, title, content);

        const updatePost = await this.postRepository.findPostById(postId);

        return {
            postId: updatePost.postId,
            nickname: updatePost.nickname,
            title: updatePost.title,
            content: updatePost.content,
            createdAt: updatePost.createdAt,
            updatedAt: updatePost.updatedAt,
        };
    };

    deletePost = async (postId, password) => {
        const findPost = await this.postRepository.findPostById(postId);
        if (!findPost) throw new Error("Post doesn't exist");

        await this.postRepository.deletePost(postId, password);

        return {
            postId: findPost.postId,
            nickname: findPost.nickname,
            title: findPost.title,
            content: findPost.content,
            createdAt: findPost.createdAt,
            updatedAt: findPost.updatedAt,
        };
    };
}

module.exports = PostService;