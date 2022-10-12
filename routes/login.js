const express = require("express");
const {Users} = require("../models"); //⭐
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
    const { nickname, password } = req.body;
    const user = await Users.findOne({where: { nickname }});

    if (!user || password !== user.password || nickname !== user.nickname) {
        res.status(400).send({
            errorMessage: "닉네임 또는 패스워드를 확인해주세요.",
        });
        return;
    }

    res.send({
        token: jwt.sign({ userId: user.userId }, "시크릿키"),
    });
});

module.exports = router;