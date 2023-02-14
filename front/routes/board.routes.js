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
router.get("/:mainCd", async (req, res, next) => {
    const { mainCd } = req.params
    const { page } = req.query
    const result = await request.get(`/board/${mainCd}/${page}`)

    const { listValue, cateLength, subVal } = result.data
    // console.log(subVal)
    res.render("board/subList.html", { mainCd, listValue, cateLength, subVal })
})
///:mainCd/:subCd 라우터와 안 겹치려면 위로
router.get("/:mainCd/write", (req, res, next) => {
    const { mainCd } = req.params
    // console.log(mainCd)
    res.render("board/write.html", { mainCd })
})

// 수정 불러오기
router.get("/:mainCd/view/:boardIdx/modify", async (req, res, next) => {
    const { mainCd, boardIdx } = req.params
    const result = await request.get(`/board/${mainCd}/view/${boardIdx}`)
    const boardData = result.data
    // const hashtagResult = await request.get(`/board/${mainCd}/view/${boardIdx}/hashtags`)
    // console.log(hashtagResult);
    // const hashtagData = hashtagResult.data
    res.render("board/write.modify.html", { mainCd, boardData })
})


// 수정완료하기
router.post("/:mainCd/view/:boardIdx/modify", async (req, res, next) => {
    console.log('test1')
    const { mainCd, boardIdx } = req.params
    let data = {
        subject: req.body.subject,
        content: req.body.content,
        hash: req.body["tags-outside"],
    }
    const result = await request.put(`/board/${mainCd}/${boardIdx}`, { data })
    console.log(result)
    const { updatedBoard } = result.data
    res.redirect(`/board/${mainCd}/view/${boardIdx}`)
})

router.put("/:mainCd/view/:boardIdx", async (req, res, next) => {
    console.log('test2')
    const { mainCd, boardIdx } = req.params
    const { subject, content, hash } = req.body
    const result = await request.put(`/board/${mainCd}/${boardIdx}`, { data: { subject, content, hash } })
    const { updatedBoard } = result.data
    res.json({ updatedBoard })
})

router.get("/:mainCd/view/:boardIdx", async (req, res, next) => {
    const { mainCd, boardIdx } = req.params
    const result = await request.get(`/board/${mainCd}/view/${boardIdx}`)
    const newBoard = result.data
    // console.log(result, 123123)
    res.render("board/view.html", { newBoard })
})

//제일 밑으로 내려가자
router.get("/:mainCd/:subCd", async (req, res, next) => {
    const { mainCd, subCd } = req.params
    const pagequery = req.query
    const result = await request.get(`/board/${mainCd}/${subCd}/${pagequery.page}`)
    const { listValue } = result.data
    // console.log(listValue, 123456)
    res.render("board/subList.html", { mainCd, listValue })
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
    const result = await request.post(`/board/${mainCd}/write`, { data })
    console.log(result)
    const { newBoard, newHashTagVal } = result.data

    // console.log(newBoard, newHashTagVal)
    res.render("board/view.check.html", { mainCd, newBoard, newHashTagVal })
})
//

module.exports = router
