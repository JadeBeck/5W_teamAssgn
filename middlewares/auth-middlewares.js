const jwt = require("jsonwebtoken");
const {User, Posts} = require("../models"); //⭐

module.exports = async (req, res, next) => {
    const { authorization } = req.headers;
    // console.log(authorization)
    const [ authType, authToken ] = (authorization || "").split(" ");
    //console.log(authToken)

    if  (!authToken || authType !== "Bearer" ) {
        res.status(401).send({
            errorMessage: "로그인이 필요합니다.",
        });
        return;
    }

    try {
        // 검증 ( userId만 필요)
        const {userId} = jwt.verify(authToken, "mySecretKey");
        //console.log("TEST;", userId)
        await User.findByPk(userId).then((user) => {
            res.locals.user = user;
            //console.log(res.locals.user)
// **** 반드시 next 먼저 호출해야함 안그러면 미들웨어 레벨 예외처리 걸려서 그 뒤에있는 미들웨어는 연결 x
            next();
        });
    } catch (err) {
        res.status(401).send({
            errorMessage: "로그인이 필요한 기능입니다.",
        });
        console.log(`${err.name} : ${err.message}`);
    }
};

findPostById = async (postId) => {
    const post = await Posts.findByPk(postId);
    return post;
};