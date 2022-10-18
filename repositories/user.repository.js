const { User } = require("../models");

class UserRepository {
    findUserByNickname = async (verifyFormat) => {
        const nickname = verifyFormat.nickname;
        const user = await User.findOne({where: {nickname}});
        return user;
    };

    signup = async (nickname, password) => {
        const registerUser = await User.create({where: {nickname, password}});
        return registerUser;
    }

    login = async (nickname, password) => {
        const findUser = await User.findOne({where: {nickname, password}});
        return findUser;
    }
}

module.exports = UserRepository;