const express = require("express");
const likeRouter = require("./routes/like.routes.js");
const postsRouter = require("./routes/posts.routes.js");
const commentsRouter = require("./routes/comments.routes.js");
const userRouter = require("./routes/user.routes.js");

const app = express();
const router = express.Router();

app.use(express.json());
// ππ»JSON μ΄λΌλ κ·κ²©μ body λ°μ΄ν°λ₯Ό μμ½κ² μ¬μ©ν  μ μκ² λμμ£Όλ λ―Έλ€μ¨μ΄
app.use("/", express.urlencoded({ extended: false }), router);
// ππ»form-urlencoded λΌλ κ·κ²©μ body λ°μ΄ν°λ₯Ό μμ½κ² μ¬μ©ν  μ μκ² λμμ£Όλ λ―Έλ€μ¨μ΄
app.use("/", [likeRouter, postsRouter, commentsRouter, userRouter]);

app.listen(8080, () => {
    console.log("μλ²κ° μμ²­μ λ°μ μ€λΉκ° λμ΄μ");
});