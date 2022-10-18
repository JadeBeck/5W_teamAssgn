const express = require("express");
const likeRouter = require("./routes/like.routes.js");
const postsRouter = require("./routes/posts.routes.js");
const commentsRouter = require("./routes/comments.routes.js");
const userRouter = require("./routes/user.routes.js");

const app = express();
const router = express.Router();

app.use(express.json());
// 👆🏻JSON 이라는 규격의 body 데이터를 손쉽게 사용할 수 있게 도와주는 미들웨어
app.use("/", express.urlencoded({ extended: false }), router);
// 👆🏻form-urlencoded 라는 규격의 body 데이터를 손쉽게 사용할 수 있게 도와주는 미들웨어
app.use("/", [likeRouter, postsRouter, commentsRouter, userRouter]);

app.listen(8080, () => {
    console.log("서버가 요청을 받을 준비가 됐어요");
});