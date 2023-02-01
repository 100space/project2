const express = require("express")
const router = express.Router()
const axios = require("axios")
const request = axios.create({
    baseURL: "http://127.0.0.1:3000",
    withCredentials: true,
})
const upload = require("../midlewares/upload")

router.use("/", (req, res, next) => {
    const { token } = req.cookies
    if (token === undefined) {
        req.user = { userId: "guest" }
        next()
    } else {
        const [header, payload, signature] = token.split(".")
        const pl = JSON.parse(Buffer.from(payload, "base64url").toString("utf-8"))
        req.user = pl
        next()
    }
})

router.get("/", async (req, res, next) => {
    const { token } = req.cookies
    if (token === undefined) return res.render("index.html")
    const [header, payload, signature] = token.split(".")
    const pl = JSON.parse(Buffer.from(payload, "base64url").toString("utf-8"))
    req.user = pl
    const { userId } = req.user

    const response = await request.post("/user/check", {
        userid: userId
    })
    const { userPic: image } = response.data

    res.render("index.html", {
        userId, image
    })
})
router.post("/user/join", upload.single("userPic"), async (req, res, next) => {
    const response = await request.post("/user/join", {
        ...req.body,
        ...req.file,
    })
    const { userPic, userId, userPw, userName, nickName, address, gender, phoneNum, userEmail, userIntro } = response.data
    res.render("user/welcome.html", { userPic, userId, userPw, userName, nickName, address, gender, phoneNum, userEmail, userIntro })
})

router.post("/user/login", async (req, res, next) => {
    const response = await request.post("/user/login", {
        ...req.body,
    })
})

router.get("/user/login", (req, res, next) => {
    res.render("user/login.html")
})
router.get("/notice", (req, res, next) => {
    const { userId } = req.user
    res.render("board/list.html", { userId })
})
router.get("/community", (req, res, next) => {
    const { userId } = req.user
    res.render("board/list.html", { userId })
})
router.get("/qna", (req, res, next) => {
    const { userId } = req.user
    res.render("board/list.html", { userId })
})

module.exports = router
