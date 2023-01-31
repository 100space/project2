const express = require("express")
const router = express.Router()

router.get("/", (req, res, next) => {
    res.render("index.html")
})

router.get("/user/login", (req, res, next) => {
    res.render("user/login.html")
})
router.get("/notice", (req, res, next) => {
    res.render("board/view.html")
})
module.exports = router
