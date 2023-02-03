const express = require("express")
const router = express.Router()
const auth = require("../src/auth/auth.route")
const user = require("../src/user/user.route")
const board = require("../src/board/board.route")

router.use("/auth", auth)

router.use("/user", user)
router.use("/profile", user)
router.use("/board", board)
router.get("/", (req, res, next) => {
    res.redirect("http://127.0.0.1:3005/")
})
router.get("/notice", (req, res, next) => {
    res.redirect("http://127.0.0.1:3005/notice")
})
router.get("/community", (req, res, next) => {
    res.redirect("http://127.0.0.1:3005/community")
})
router.get("/chat", (req, res, next) => {
    res.redirect("http://127.0.0.1:3005/chat")
})
router.get("/qna", (req, res, next) => {
    res.redirect("http://127.0.0.1:3005/qna")
})

module.exports = router
