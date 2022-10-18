const UserService = require('../services/user.service');
const Joi = require('joi');
const schema = Joi.object({
    nickname: Joi.string().min(2).max(15).required(),
    password: Joi.string().min(4).max(20).required(),
    confirm: Joi.string().min(4).max(20).required(),
});

class UserController {

    userService = new UserService();

    signup = async (req, res, next) => {
        try {
            const verifyFormat = await schema.validateAsync(req.body)
            //console.log(verifyFormat);
            const registerUser = await this.userService.signup(verifyFormat);
            res.status(200).json({data: registerUser})
        } catch (error) {
            console.log(`${error.message}`);
            res.status(400).send({errorMessage: "요청한 데이터 형식이 올바르지 않습니다."});
        }
    };


    login = async (req, res, next) => {
        try {
            const {nickname, password} = req.body;
            const user = await this.userService.login(nickname, password);
           // console.log(user)
            res.status(200).json({data: user});
        } catch (error) {
            console.log(`${error.message}`);
            res.status(400).send({errorMessage: "요청한 데이터 형식이 올바르지 않습니다."});
        }
    };
}

module.exports = UserController;