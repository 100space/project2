const express = require("express")
const router = express.Router()
const axios = require("axios")
const request = axios.create({
    baseURL: "http://127.0.0.1:3000",
    withCredentials: true,
})
const upload = require("../midlewares/upload")
const { response } = require("../../back/app")

router.use("/", (req, res, next) => {
    try {
        const { token } = req.cookies
        if (token === undefined) {
            req.user = { userId: "guest" }
        } else {
            const [header, payload, signature] = token.split(".")
            const pl = JSON.parse(Buffer.from(payload, "base64url").toString("utf-8"))
            req.user = pl
        }
    } catch (error) {
    } finally {
        next()
    }
})
router.use(async (req, res, next) => {
    const { userId } = req.user
    const response = await request.post("/user/check", {
        userId: userId,
    })
    req.body = response
    next()
})

router.get("/", async (req, res, next) => {
    data = req.body.data
    if (data !== null) {
        const { userPic, userId } = data
        req.query = userPic
        res.render("index.html", {
            userId,
            userPic,
        })
    } else {
        res.render("index.html")
    }
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
    const { userId } = req.user
    res.render("user/login.html", {
        userId,
    })
})

router.get("/user/checkaddress", (req, res, next) => {
    res.render("user/checkaddress.html")
})

router.get("/notice", (req, res, next) => {
    data = req.body.data
    const { userId, userPic } = data
    res.render("board/list.html", { userId, userPic })
})

router.get("/write", (req, res, next) => {
    res.render("board/write.html")
})

router.get("/community", (req, res, next) => {
    const { userId } = req.user
    res.render("board/list.html", { userId })
})

router.get("/community/view/like/:boardIdx", async (req, res, next) => {
    const { userId } = req.cookies
    const { boardIdx } = req.params
    const response = await request.post("/board/like", {
        userId,
        boardIdx,
    })
    console.log(response)
    res.send("1")
})

router.get("/notice/write", (req, res, next) => {
    const { userId } = req.user
    res.render("board/write.html")
})

router.get("/notice/view", (req, res, next) => {
    const { userId } = req.user
    console.log(req.body)
    res.render("board/view.html")
})

router.get("/qna", (req, res, next) => {
    const { userId } = req.user
    res.render("board/list.html", { userId })
})

router.get("/user/welcome/:id", async (req, res, next) => {
    const { id } = req.params
    const response = await request.post("/user/check", {
        userId: id,
    })
    const { data } = response
    // const { userPic, userId, userPw, userName, nickName, address, gender, phoneNum, userEmail, userIntro } = response
    // res.render("user/welcome.html", userPic, userId, userPw, userName, nickName, address, gender, phoneNum, userEmail, userIntro)
    res.render("user/welcome.html", { ...data })
})
router.get("/profile/:id", async (req, res, next) => {
    const { id } = req.params
    const response = await request.post("/user/check", {
        userId: id,
    })
    const { data } = response
    res.render("user/mypage.html", {
        ...data,
        // userPic: image,
    })
})
router.post("/profile/modify/:id", async (req, res, next) => {
    const { id } = req.params
    // console.log(req.body, "F.index")
    const response = await request.put(`/profile/modify/${id}`, {
        userId: id,
    })
    console.log(response)
    const { data } = response
    res.render("user/mypage.html", {
        id,
        ...data,
        // userPic: image,
    })
})
router.get("/profile/modify/:id", async (req, res, next) => {
    const { id } = req.params
    const response = await request.post("/user/check", {
        userId: id,
    })
    const { data } = response
    res.render("user/mypage.modify.html", {
        ...data,
        // userPic: image,
    })
})
router.get("/view")
module.exports = router
