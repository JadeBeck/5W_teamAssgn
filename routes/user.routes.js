const express = require('express');
const userRouter = express.Router();
const UserController = require('../controllers/user.controller');  //⭐
const userController = new UserController();  //⭐AuthController에 대한 클래스 선언해서 authController에 담음
const authMiddleware = require("../middlewares/auth-middlewares");

userRouter.post('/signup', userController.signup);  //⭐②createPost 메소드로 연결
userRouter.post('/login', userController.login);  //⭐②createPost 메소드로 연결

module.exports = userRouter;