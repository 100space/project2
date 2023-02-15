const dotenv = require("dotenv").config({ path: "../../.env" })
const SALT = process.env.SALT || "test"

class UserService {
    constructor({ userRepository, jwt }) {
        this.userRepository = userRepository
        this.jwt = jwt
        this.crypto = jwt.crypto
        this.mainChange = {
            notice: "0001",
            community: "0002",
            qna: "0003",
        }
    }

    async HotValue() {
        try {
            const response = await this.userRepository.hotValue()
            return response
        } catch (e) {
            throw new Error(e)
        }
    }

    async SignUp({ filename: userPic, userId, userPw, userName, nickName, address1, address2, gender, phoneNum, userEmail, userIntro, provider }) {
        try {
            if (!userId || !userPw || !userName) throw "Invalid or empty, Confirm your Information"
            const hash = this.crypto.createHmac("sha256", SALT).update(userPw).digest("hex")
            const address = address1 + " " + address2
            const user = await this.userRepository.addUser({ userPic, userId, userPw: hash, userName, nickName, address, gender, phoneNum, userEmail, userIntro })
            return user
        } catch (e) {
            throw new Error(e)
        }
    }

    async CheckId({ userId }) {
        try {
            const user = await this.userRepository.checkId({ userId })
            return user
        } catch (e) {
            throw new Error(e)
        }
    }
    async CheckNick({ nickName }) {
        try {
            const user = await this.userRepository.checkNick({ nickName })
            return user
        } catch (e) {
            throw new Error(e)
        }
    }

    async SignIn(token) {
        try {
            const { userId } = this.jwt.verify(token, SALT)
            const user = await this.userRepository.getInfo(userId)
            return user
        } catch (e) {
            throw new Error(e)
        }
    }

    async SignUpdate(payload) {
        const address = payload.address1 + " " + payload.address2
        payload.address = address
        // console.log(payload, 123123)
        try {
            const updateUser = await this.userRepository.updateInfo(payload)
            return updateUser
        } catch (e) {
            throw new Error(e)
        }
    }

    async FindSearch({ search }) {
        try {
            const result = await this.userRepository.findSearch({ search })
            return result
        } catch (e) {
            throw new Error(e)
        }
    }

    // 내가 쓴 글
    async FindWriting({ userId, page }) {
        try {
            const result = await this.userRepository.findWriting({ userId, page })
            const { response, findMain } = result
            const myLength = response.length

            const writeCd = []
            const myWriteMainCd = response.map((x) => {
                const myCdValue = x.cateCd.slice(0, 4)
                writeCd.push(myCdValue)

                let writeCdresult = writeCd.filter((value, index) => {
                    return writeCd.indexOf(value) === index
                })
                return writeCdresult
            })
            const mainCdValue = findMain.map((x) => {
                const myCdValue = x.cateCd.slice(0, 4)
                switch (myCdValue) {
                    case "0001":
                        x.mainCd = "notice"
                        break
                    case "0002":
                        x.mainCd = "community"
                        break
                    case "0003":
                        x.mainCd = "qna"
                        break
                }
                return x
            })

            const writeCdarray = myWriteMainCd.pop()
            writeCdarray.forEach((x, i, arr) => {
                switch (x) {
                    case "0001":
                        arr[i] = "notice"
                        break
                    case "0002":
                        arr[i] = "community"
                        break
                    case "0003":
                        arr[i] = "qna"
                        break
                }
            })
            return { myLength, findMain: mainCdValue, writeCdarray }
        } catch (e) {
            throw new Error(e)
        }
    }

    // 내가 쓴 글 분류
    async myMainCd({ userId }) {
        try {
            const { mainCd } = req.params
            // const result
        } catch (e) {
            throw new Error(e)
        }
    }
}

module.exports = UserService
