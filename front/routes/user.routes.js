const express = require("express")
const router = express.Router()
const axios = require("axios")
const upload = require("../midlewares/upload")
const request = axios.create({
    baseURL: "http://127.0.0.1:3000",
    withCredentials: true,
})

router.use("/",(req, res, next) => {
        const { userPic, userId, userPw, userName, nickName, provider } = req.userInfo
    const { boardHot, userHot } = req
    res.locals = { boardHot, userHot }
    res.locals = { ...res.locals, userPic, userId, userPw, userName, nickName, provider }
    next()
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
    const { page } = req.query
    const response = await request.post("/profile/myview/mywrite", { userId, page })
    const {
        data: { myLength, findMain, writeCdarray },
    } = response
    console.log(myLength, findMain, writeCdarray)
    res.render("user/mywrite.html", { myLength, listValue: findMain, subVal: writeCdarray })
})

router.get("/myview/:mainCd")

router.get("/myview/reaction", async(req,res,next)=>{
    const {page} = req.query
    
    
})


module.exports = router
