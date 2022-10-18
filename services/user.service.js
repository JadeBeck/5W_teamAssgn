const UserRepository = require('../repositories/user.repository');
const jwt = require("jsonwebtoken");
const { User } = require("../models");

class UserService {
    userRepository = new UserRepository();

    signup = async (verifyFormat) => {
        try {
            if (verifyFormat.password !== verifyFormat.confirm) {
                throw new Error("패스워드와 패스워드 확인란이 다릅니다")
            }

                    console.log(verifyFormat)
            const existsUser = await this.userRepository.findUserByNickname(verifyFormat);

            if (existsUser) {
                throw new Error("중복된 닉네임입니다.")
            }

            await this.userRepository.signup(verifyFormat.nickname, verifyFormat.password);
            return "회원가입에 성공하였습니다.";
        } catch (error) {
            console.log(`${error.name} : ${error.message}`);
            throw new Error(error);
        }
    };

    login = async (nickname, password) => {
        const user = await this.userRepository.login(nickname, password);
        if (!user || password !== user.password || nickname !== user.nickname) {
           return "닉네임 또는 패스워드를 확인해주세요."
        }
        let token =  jwt.sign({userId: user.userId}, "mySecretKey");
        return { message: "로그인 성공", token: token };
    }
}

module.exports = UserService;



/*router.post("/signup", async (req, res) => {
    try {
        const {nickname, password, confirm} = await userSchema.validateAsync(req.body);
        const existsUsers = await Users.findOne({where: { nickname }})
        if (password.search(nickname) === nickname) {
            res.status(400).send({ errorMessage: "형식에 맞지 않는 비밀번호입니다." });
            return;
        }
        if (password !== confirm) {
            res.status(400).send({ errorMessage: "패스워드가 패스워드 확인란과 다릅니다." });
            return;
        }
        if (existsUsers) {
            res.status(400).send({ errorMessage: "중복된 닉네임입니다." });
            return;
        }
        await Users.create({nickname, password});
        res.status(201).send({message: "회원가입에 성공하였습니다."});
    } catch (error) {
        a
    }
});*/
