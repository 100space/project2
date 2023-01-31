const dotenv = require('dotenv').config({ path: "../../.env" });
const SALT = process.env.SALT || 'test';
const crypto = require("crypto")

class UserService {
    constructor({ userRepository, jwt }) {
        this.userRepository = userRepository;
        this.jwt = jwt;
        this.crypto = crypto;
    }

    async SignUp({ userPic, userId, userPw, userName, nickName, address, gender, phoneNum, userEmail, userIntro }) {

        try {
            if (!userId || !userPw || !userName) throw "Invalid or empty, Confirm your Information";
            const hash = this.crypto.createHmac("sha256", SALT).update(userPw).digest("hex");
            const user = await this.userRepository.addUser({ userPic, userId, userPw: hash, userName, nickName, address, gender, phoneNum, userEmail, userIntro })
            return user
        } catch (e) {
            throw new Error(e)
        }
    }

    async SignIn(token) {
        try {
            const payload = this.jwt.verify(token, SALT);
            const { userId } = this.jwt.verify(token, SALT);
            const user = await this.userRepository.getInfo(userId);
            return user;
        } catch (e) {
            throw new Error(e)
        }
    }

    async SignUpdate(userId, payload) {
        try {
            const updateUser = await this.userRepository.updateInfo(userId, payload);
            return updateUser;
        } catch (e) {
            throw new Error(e)
        }
    }
}

module.exports = UserService;