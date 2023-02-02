const dotenv = require("dotenv").config()
const port = process.env.PORT || "3000"
const router = require("./routes/index")
const app = require("./app")
const { sequelize } = require("./models")
const { models: { User } } = sequelize
// onst { User } = modelsc
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

app.listen(port, async () => {
    console.log("connecting to backend and Database...")
    await sequelize.sync({ force: true })
    await User.create({ userId: "admin", userPw: hash, userName: "123", nickName: "12345", address: "11", gender: "11", phoneNum: "11", userEmail: "11", userIntro: "11", userPic: '1675217223079.png' })
    console.log(`Starting Server with port Number is ${port}`)
})
