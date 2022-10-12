const express = require("express");
const router = express.Router();
const { Users } = require("../models"); //⭐
const Joi = require("joi");
const userSchema = Joi.object({
    nickname: Joi.string(), //.pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    password: Joi.string(), //.pattern(new RegExp("^{4,30}$")).required(),
    confirm: Joi.string() //.pattern(new RegExp("^{4,30}$")).required(),
});

router.post("/signup", async (req, res) => {
    try {
        const {nickname, password, confirm} = await userSchema.validateAsync(req.body);  //joi...⁉⁉⁉⁉⁉

        if (password.search(nickname) === nickname) {
            res.status(400).send({ errorMessage: "형식에 맞지 않는 비밀번호입니다." });
            return;
        }

        if (password !== confirm) {
            res.status(400).send({ errorMessage: "패스워드가 패스워드 확인란과 다릅니다." });
            return;
        }
        // nickname 동일한게 이미 있는지 확인
        const existsUsers = await Users.findOne({where: { nickname }})
        if (existsUsers) {
            res.status(400).send({ errorMessage: "중복된 닉네임입니다." });
            return;
        }

        await Users.create({nickname, password});
        res.status(201).send({message: "회원가입에 성공하였습니다."});

    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        res.status(400).send({ errorMessage: "요청한 데이터 형식이 올바르지 않습니다." });
    }
});

module.exports = router;