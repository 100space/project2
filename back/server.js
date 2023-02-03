const dotenv = require("dotenv").config()
const port = process.env.PORT || "3000"
const router = require("./routes/index")
const app = require("./app")
const { sequelize } = require("./models")
const { models: { User, Board, Comment, Hashtag, Point, Liked, Hash, Counterimg } } = sequelize


const JWT = require("./lib/jwt")
const crypto = require("crypto")
const SALT = process.env.SALT

const jwt = new JWT({ crypto })

const userPw = "11"
const hash = jwt.crypto.createHmac("sha256", SALT).update(userPw).digest("hex")
console.log(hash)
app.use(router)

app.use((error, req, res, next) => {
    console.log(error)
    res.status(500).send(error.message)
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
