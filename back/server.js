const dotenv = require("dotenv").config()
const port = process.env.PORT || "3000"
const router = require("./routes/index")
const app = require("./app")
const qs = require("qs")
const { sequelize } = require("./models")
const axios = require("axios")
const {
    models: { User, Board, Comment, Hashtag, Point, Liked, Hash, Counterimg },
} = sequelize

const JWT = require("./lib/jwt")
const crypto = require("crypto")
const SALT = process.env.SALT

const jwt = new JWT({ crypto })

const userPw = "11"
const hash = jwt.crypto.createHmac("sha256", SALT).update(userPw).digest("hex")

app.use(router)

app.use((error, req, res, next) => {
    console.log(error)
    res.status(500).send(error.message)
})

const HOST = `https://kauth.kakao.com`
const REDIRECT_URI = `http://127.0.0.1:3000/oauth/kakao`
const REST_API_KEY = `a540a18bfac74a86ac5ebed64df7ab64`
const CLIENT_SECRET = `X7FMGoY2FumD7MXrSGsUOSiPkoaN0L9A`
app.get("/oauth/kakao", async (req, res, next) => {
    try {
        const { code } = req.query
        const host = `${HOST}/oauth/token`
        const header = {
            "Content-type": "application/x-www-form-urlencoded",
        }
        const body = qs.stringify({
            grant_type: "authorization_code",
            client_id: REST_API_KEY,
            redirect_uri: REDIRECT_URI,
            code,
            client_secret: CLIENT_SECRET,
        })
        const response = await axios.post(host, body, header)
        const { access_token } = response.data
        // console.log(access_token, "123123")

        const hostUser = `https://kapi.kakao.com/v2/user/me`
        const user = await axios.post(hostUser, null, {
            headers: {
                "Content-type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${access_token}`,
            },
        })
        console.log(user.data, "============")
        const sns = {
            // userPic : user.data.properties.["profile_image"],
            userId: user.data.id,
            userPw: user.data.id,
            userName: user.data.properties.nickname,
            provider: "kakao",
            snsId: user.data["kakao_account"].email,
        }
        const [snsCreate] = await User.findOrCreate({
            where: { snsId: sns.snsId },
            defaults: sns,
        }) // 만들어짐.
        const { userid, userpw } = snsCreate.dataValues
        const bodys = { userid, userpw }
        const result = await axios.post("http://127.0.0.1:3000/auth", bodys, {
            headers: {
                "Content-type": "application/json",
            },
        })
    } catch (error) { }
    res.redirect("http://127.0.0.1:3005/")
})

app.listen(port, async () => {
    console.log("connecting to backend and Database...")
    await sequelize.sync({ force: true })
    for (i = 1; i <= 10; i++) {
        await User.create({
            userId: `admin${i}`,
            userPw: hash,
            userName: "123",
            nickName: `${i}12345`,
            address: "11",
            gender: "11",
            phoneNum: "11",
            userEmail: "11",
            userIntro: "11",
            userPic: `${i}.png`,
        })
        await Board.create({ subject: `test${i}`, content: "test", categoryMain: "Q&A", categorySub: "baek", userId: `admin${i}` })
    }
    await User.create({
        userId: `guest`,
        userPw: hash,
        userName: "123",
        nickName: `guest`,
        address: "11",
        gender: "11",
        phoneNum: "11",
        userEmail: "11",
        userIntro: "11",
        userPic: `1.png`,
    })
    console.log(`Starting Server with port Number is ${port}`)
})
