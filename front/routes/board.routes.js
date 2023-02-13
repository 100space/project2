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
    const { page } = req.query
    const result = await request.get(`/board/${mainCd}/${page}`)
    const { data } = result
    console.log(data)
    res.render("board/subList.html", { mainCd, listValue: data })
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
        userId: req.body.writer,
        subject: req.body.subject,
        content: req.body.content,
        hash: req.body["tags-outside"],
        mainCd,
        subCd: req.body.categorySub,
    }
    const result = await request.post(`/board/${mainCd}/write`, data)
    console.log(result)
    // const { newBoard, newHashTagVal } = result.data

    // console.log(newBoard)
    res.render("board/view.check.html", { mainCd, newBoard, newHashTagVal })
    // res.render("board/view.html")
})
//

module.exports = router
