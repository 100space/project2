const express = require("express")
const router = express.Router()
const axios = require("axios")
const request = axios.create({
    baseURL: "http://127.0.0.1:3000",
    withCredentials: true,
})
//
router.use((req, res, next) => {
    const { userPic, userId, userPw, userName, nickName, provider } = req.userInfo
    const { boardHot, userHot } = req
    res.locals = { boardHot, userHot }
    res.locals = { ...res.locals, userPic, userId, userPw, userName, nickName, provider }
    next()
})
/////////////검색기능 라우터 확인
router.get("/:mainCd", async (req, res, next) => {
    const { mainCd } = req.params
    const pagequery = req._parsedUrl.query
    console.log(pagequery)
    const result = await request.get(`/board/${mainCd}?${pagequery}`)
    const { response, subVal, subCount } = result.data
    console.log(result.data)
    res.render("board/subList.html", { mainCd, listValue: response, subVal })
})
///:mainCd/:subCd 라우터와 안 겹치려면 위로
router.get("/:mainCd/write", (req, res, next) => {
    const { mainCd } = req.params
    console.log(mainCd)
    res.render("board/write.html", { mainCd })
})

router.get("/:mainCd/view/:boardIdx", async (req, res, next) => {
    const { mainCd, boardIdx } = req.params
    const result = await request.get(`/board/${mainCd}/view/${boardIdx}`)

    console.log(result, 132432)
    res.render("board/view.html")
})

//제일 밑으로 내려가자
router.get("/:mainCd/:subCd", async (req, res, next) => {
    const { mainCd, subCd } = req.params
    const pagequery = req.query
    const result = await request.get(`/board/${mainCd}/${subCd}/${pagequery.page}`)
    const { response, subCount } = result.data
    console.log(response, 123456)
    res.render("board/subList.html", { mainCd, listValue: response, boardCount: subCount })
})
/////////////

router.post("/:mainCd/write", async (req, res, next) => {
    const { mainCd } = req.params
    let data = {
        writer: req.body.writer,
        subject: req.body.subject,
        content: req.body.content,
        tags: req.body["tags-outsild"],
        mainCd,
        subCd: req.body.categorySub,
    }
    console.log(req.userInfo, 123123)
    // const result = await request.post(`/board/${mainCd}/write`, { data })
    // res.render("board/view.check.html", { mainCd, data })
    res.render("board/view.html")
})
//

module.exports = router
