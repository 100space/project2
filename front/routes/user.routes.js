const express = require("express")
const router = express.Router()
const axios = require("axios")
const upload = require("../midlewares/upload")
const request = axios.create({
    baseURL: "http://127.0.0.1:3000",
    withCredentials: true,
})

router.use("/",(req, res, next) => {
    if(!req.userInfo) return next()
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
        data: { myLength, findMain, writeCdarray, boardData },
    } = response
    res.render("user/mywrite.html", { myLength, listValue: findMain, subVal: writeCdarray, currentPage : page })
})


// 내가 좋아요 누른 글, 내가 쓴 글 
router.get("/myview/reaction", async(req,res,next)=>{
    const {userId} = req.user
    const { boardHot } = req
    const { userHot } = req
    const response = await request.post("/user/myview/reaction", { userId})
    const {data : {myBoardResponse, myLikeResponse}} = response
    const myBoardResponseCount = myBoardResponse.length
    const myLikeReseponseCount = myLikeResponse.length
    res.render("user/reaction.html", {commentCount : myBoardResponseCount, commentValue:myBoardResponse, likeCount: myLikeReseponseCount, likeValue:myLikeResponse })
})

// 나의 글 내의 Category 선택
router.get("/myview/:mainCd", async(req,res,next) => {
    const { userId } = req.user
    const { boardHot } = req
    const { userHot } = req
    let { page } = req.query
    const { mainCd } = req.params
    const response = await request.post("/profile/myview/mywrite", {userId, page})
    const { data: { boardData } } = response;
    const findMainCd = boardData.map(item => {
        const cateCd = item.cateCd.substring(0, 4)
        let mainCd
        switch (cateCd) {
            case "0001":
            mainCd = "notice"
            break
            case "0002":
            mainCd = "community"
            break;
            case "0003":
            mainCd = "qna"
            break
            default:
            mainCd = ""
            break
        }
    return mainCd
    })
    const { data : {myLength, findMain, writeCdarray},} = response
    const filteredFindMain = findMain.filter((item) => item.mainCd === mainCd)
    const totalPage = Math.ceil(filteredFindMain.length / 5)
    if (!page) {
        page = 1 
    } else if (page > totalPage) {
        page = totalPage
    }
    const startIdx = (page - 1) * 5
    const endIdx = startIdx + 5
    const pagedFindMain = filteredFindMain.slice(startIdx, endIdx)
    res.render("user/mywrite.html", {myLength, listValue : pagedFindMain, subVal : writeCdarray, mainCd, currentPage : page, totalPage})
})


module.exports = router
