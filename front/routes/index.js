const express = require("express")
const router = express.Router()
const axios = require("axios")
const user = require("./user.routes")
const profile = require("./profile.routes")
const upload = require("../midlewares/upload")
const config = require("../config")
const e = require("express")
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
router.use("/user", user)
router.use("/profile", profile)

router.get("/token/:token", async (req, res, next) => {
    const { token } = req.params
    res.cookie("token", token)
    res.redirect("/")
})
router.get("/", async (req, res, next) => {
    const userInfo = req.userInfo
    const { boardHot } = req
    const { userHot } = req
    const response = await request.get("/board/random")
    const { data } = response
    res.render("index.html", { ...userInfo, data, boardHot, userHot })
})

router.get("/search", (req, res, next) => {
    const userInfo = req.userInfo
    const { boardHot } = req
    const { userHot } = req
    const { search } = req.query
    console.log(search)
    res.render("board/search.html", { ...userInfo, boardHot, userHot, search })
})

router.get("/notice", (req, res, next) => {
    const userInfo = req.userInfo
    const { boardHot } = req
    const { userHot } = req
    res.render("board/list.html", { ...userInfo, boardHot, userHot })
})
router.get("/community", (req, res, next) => {
    const userInfo = req.userInfo
    const { boardHot } = req
    const { userHot } = req
    res.render("board/list.html", { ...userInfo, boardHot, userHot })
})
router.get("/qna", (req, res, next) => {
    const userInfo = req.userInfo
    const { boardHot } = req
    const { userHot } = req
    res.render("board/list.html", { ...userInfo, boardHot, userHot })
})

router.get("/write/:categoryMain", (req, res, next) => {
    const userInfo = req.userInfo
    const { boardHot } = req
    const { userHot } = req
    const { categoryMain } = req.params
    res.render("board/write.html", { ...userInfo, categoryMain, boardHot, userHot })
})
router.post("/write/:categoryMain", async (req, res, next) => {
    const userInfo = req.userInfo
    const { boardHot } = req
    const { userHot } = req
    const { categoryMain } = req.params
    if (!req.body["tags-outside"]) {
        let data = {
            writer: req.body.writer,
            subject: req.body.subject,
            content: req.body.content,
            categoryMain,
            categorySub: req.body.categorySub,
        }
        const response = await request.post(`/board/write/${categoryMain}`, { data, userInfo })
        console.log(response)
        const { data: { newBoard, newHashTagVal } } = response
        res.render("board/view.html", { ...newBoard, newHashTagVal, ...userInfo, boardHot, userHot })
    } else {
        let tags = JSON.parse(req.body["tags-outside"])
        let tagValues = tags.map((tag) => {
            return tag.value
        })
        let data = {
            writer: req.body.writer,
            subject: req.body.subject,
            content: req.body.content,
            tags: tagValues,
            categoryMain,
            categorySub: req.body.categorySub,
        }
        const response = await request.post(`/board/write/${categoryMain}`, { data, userInfo })
        const { data: { newBoard, newHashTagVal } } = response
        res.render("board/view.check.html", { ...newBoard, newHashTagVal, ...userInfo, boardHot, userHot })
    }
})

router.get("/:categoryMain/view/:boardIdx", async (req, res, next) => {
    const userInfo = req.userInfo
    const { boardHot } = req
    const { userHot } = req
    const { categoryMain, boardIdx } = req.params
    const response = await request.post(`/board/${categoryMain}/view`, { userInfo, boardIdx })
    const { data } = response
    res.render("board/view.html", { ...data, boardHot, userHot })
})

router.get("/:categoryMain/delete/:boardIdx", async (req, res, next) => {
    const { categoryMain, boardIdx } = req.params
    const { boardHot } = req
    const { userHot } = req
    const result = await request.delete(`/board/${categoryMain}/${boardIdx}`)
    res.redirect(`/${categoryMain}`)
})

router.get("/:categoryMain/view/like/:boardIdx", async (req, res, next) => {
    const userInfo = req.userInfo
    const { boardHot } = req
    const { userHot } = req
    const { categoryMain, boardIdx } = req.params
    const response = await request.post(`/board/${categoryMain}/view/like`, { userInfo, categoryMain, boardIdx })
    res.redirect(`/${categoryMain}/view/${boardIdx}`)
})

router.get("/:categoryMain/view/modify/:boardIdx", async (req, res, next) => {
    const userInfo = req.userInfo
    const { boardHot } = req
    const { userHot } = req
    const { categoryMain, boardIdx } = req.params
    console.log(categoryMain, boardIdx)
    const response = await request.put(`/board/${categoryMain}/view`, { userInfo, boardIdx })
    const { data } = response
    res.render("board/view.modify.html", { ...data, boardHot, userHot })
})

router.get("/oauth/kakao", (req, res, next) => {
    const redirectURL = `${config.kakaoHOST}/oauth/authorize?client_id=${config.kakaoREST_API_KEY}&redirect_uri=${config.kakaoREDIRECT_URI}&response_type=code`

    res.redirect(redirectURL)
})

module.exports = router
