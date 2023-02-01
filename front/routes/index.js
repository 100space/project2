const express = require("express")
const router = express.Router()
const axios = require("axios")
const request = axios.create({
    baseURL: "http://127.0.0.1:3000",
    withCredentials: true,
})

router.get("/", (req, res, next) => {
    res.render("index.html")
})
router.post("/user/join", async (req, res, next) => {
    const response = await request.post("/user/join", {
        ...req.body,
    })
    console.log(response.data)
    const { userPic, userId, userPw, userName, nickName, address, gender, phoneNum, userEmail, userIntro } = response.data
    res.render("user/welcome.html", { userPic, userId, userPw, userName, nickName, address, gender, phoneNum, userEmail, userIntro })
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
