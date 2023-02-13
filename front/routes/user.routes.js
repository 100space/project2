const express = require("express")
const router = express.Router()
const axios = require("axios")
const upload = require("../midlewares/upload")
const request = axios.create({
    baseURL: "http://127.0.0.1:3000",
    withCredentials: true,
})


router.get("/login", (req, res, next) => {
    const { boardHot } = req
    const { userHot } = req
    res.render("user/login.html", { boardHot, userHot })
})

router.post("/login", async (req, res, next) => {
    const response = await request.post("/user/login", {
        ...req.body,
    })
})

router.post("/join", upload.single("userPic"), async (req, res, next) => {
    const { boardHot } = req
    const { userHot } = req
    const response = await request.post("/user/join", {
        ...req.body,
        ...req.file,
    })
    res.render("user/welcome.html", { ...response.data, boardHot, userHot })
})

router.get("/myview", async (req, res, next) => {
    const { userId } = req.user
    const { boardHot } = req
    const { userHot } = req
    const {page} = req.query
    const response = await request.post("/profile/myview/mywrite", { userId, page })
    const { data } = response
    res.send("1")
    // res.render("board/subList.html",)
})


module.exports = router
