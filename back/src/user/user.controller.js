const { Sign } = require('crypto');

class UserController {
    constructor({ userService }) {
        this.userService = userService;
    }
    async postSignUp(req, res, next) {
        try {
            const { userId, userPw, userName, nickName, address, gender, phoneNum, userEmail, userIntro, provider, snsId, userLevel, filename } = req.body;
            const user = await this.userService.SignUp({ filename, userId, userPw, userName, nickName, address, gender, phoneNum, userEmail, userIntro, provider, snsId, userLevel })
            res.status(201).json(user)
        } catch (e) {
            next(e);
        }
    }

    async checkUserid(req, res, next) {
        try {
            const { userid } = req.body
            const user = await this.userService.CheckId({ userid })
            res.status(201).json(user)
        } catch (e) {
            next(e)
        }
    }

    async getSignIn(req, res, next) {
        try {

            if (!req.headers.authorization) throw new Error("SignIn is Invalid, Please Sign in your account");

            const [type, token] = req.headers.authorization.split(" ");
            if (type.toLowerCase() !== "bearer") throw new Error("Error occurred Invalid Authorization. Please close the browser and then try again.");

            const user = await this.userService.SignIn(token)
            res.json(user);
        } catch (e) {
            next(e);
        }
    }

    async putUpdateUser(req, res, next) {
        try {
            const { userId } = req.params;
            const { userPic, userPw, userName, nickName, address, gender, phoneNum, userEmail, userIntro, provider, snsId, userLevel } = req.body;
            const updateUser = await this.userService.updateUser(userId, { userPic, userPw, userName, nickName, address, gender, phoneNum, userEmail, userIntro, provider, snsId, userLevel });
            res.status(200).json(updateUser);
        } catch (e) {
            next(e)
        }
    }
}

module.exports = UserController


