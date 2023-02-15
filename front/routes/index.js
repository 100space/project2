const express = require("express")
const router = express.Router()
const axios = require("axios")
const user = require("./user.routes")
const profile = require("./profile.routes")
const board = require("./board.routes")
const upload = require("../midlewares/upload")
const config = require("../config")
const admin = require("./admin.routes")
const request = axios.create({
    baseURL: "http://127.0.0.1:3000",
    withCredentials: true,
})

router.use("/", async (req, res, next) => {
    try {
        const { token } = req.cookies
        if (token === undefined) {
            req.user = { userId: "guest" }
            const boardResponse = await request.get("/board/hot")
            const boardHot = boardResponse.data
            req.boardHot = boardHot
            const userResponse = await request.get("/user/hot")
            const userHot = userResponse.data
            req.userHot = userHot
            res.cookie("token", "guest")
        } else {
            const [header, payload, signature] = token.split(".")
            const pl = JSON.parse(Buffer.from(payload, "base64url").toString("utf-8"))
            req.user = pl
            const { userId } = req.user
            const response = await request.post("/user/check", {
                userId,
            })
            const { data } = response
            req.userInfo = data
            const boardResponse = await request.get("/board/hot")
            const boardHot = boardResponse.data
            req.boardHot = boardHot
            const userResponse = await request.get("/user/hot")
            const userHot = userResponse.data
            req.userHot = userHot
        }
    } catch (error) {
    } finally {
        next()
    }
})

router.get("/login", (req, res, next) => {
    const { boardHot } = req
    const { userHot } = req
    res.render("user/login.html", { boardHot, userHot })
})
router.use("/user", user)
router.use("/profile", profile)
router.use("/board", board)
router.use("/admin,", admin)

router.get("/io", (req, res, next) => {
    res.render("/layout/layout.html")
})
router.get("/token/:token", async (req, res, next) => {
    const { token } = req.params
    res.cookie("token", token)
    res.redirect("/")
})

router.get("/oauth/kakao", (req, res, next) => {
    const redirectURL = `${config.kakaoHOST}/oauth/authorize?client_id=${config.kakaoREST_API_KEY}&redirect_uri=${config.kakaoREDIRECT_URI}&response_type=code`
    res.redirect(redirectURL)
})

router.get("/manage", (req, res, next) => {
    res.render("user/management.html")
})
router.get("/search", async (req, res, next) => {
    const userInfo = req.userInfo
    const { boardHot } = req
    const { userHot } = req
    const { search } = req.query
    const boardResponse = await request.post("/board/search", { search })
    const { boardCount } = boardResponse.data
    const boardValue = boardResponse.data.response
    const categoryMap = {'0001' : 'notice', '0002' : 'community', '0003' : 'qna'}
    const data1 = boardValue.map((x) => {
        x.createdAt = x.createdAt.substring(0, 10)
        x.cateCd = x.cateCd.substring(0,4)
        x.mainCd = categoryMap[x.cateCd] || ''
        return x
    })
    console.log(data1);
    const userResponse = await request.post("/user/search", { search })
    const { userCount } = userResponse.data
    const userValue = userResponse.data.response
    res.render("board/search.html", { ...userInfo, boardHot, userHot, search, boardCount, data1, userCount, userValue })
})

router.get("/", async (req, res, next) => {
    const userInfo = req.userInfo
    const { boardHot } = req
    const { userHot } = req
    const response = await request.get("/board/random")
    const { listValue, randomUser, randomHash } = response.data
    res.render("index.html", { ...userInfo, boardHot, userHot, boardRandom: listValue, randomUser, randomHash })
})

module.exports = router
