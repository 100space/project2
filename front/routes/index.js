const express = require("express")
const router = express.Router()
const axios = require("axios")
const request = axios.create({
    baseURL: "http://127.0.0.1:3000",
    withCredentials: true,
})
const upload = require("../midlewares/upload")

router.get("/", (req, res, next) => {
    if (req.user === undefined) return res.render("index.html")
    const { token } = req.cookies
    const [header, payload, signature] = token.split(".")
    const pl = JSON.parse(Buffer.from(payload, "base64url").toString("utf-8"))
    req.user = pl
    console.log(pl, 123123)
    const { userId } = req.user
    res.render("index.html", {
        userId,
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
    console.log(req.body)
    const response = await request.post("/user/login", {
        ...req.body,
    })
})

router.get("/user/login", (req, res, next) => {
    res.render("user/login.html")
})
router.get("/notice", (req, res, next) => {
    res.render("board/list.html")
})
router.get("/community", (req, res, next) => {
    res.render("board/list.html")
})
router.get("/qna", (req, res, next) => {
    res.render("board/list.html")
})

module.exports = router
