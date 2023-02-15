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
router.post("/:mainCd/search", async (req, res, next) => {
    const { mainCd } = req.params
    const { search } = req.body
    const result = await request.post("/board/list/search", { mainCd, search })
    const {
        data: { subjectResponse, adminResponse, subjectlength, userlength },
    } = result
    res.render("board/search.list.html", { subjectlength, userlength, subjectResponse, adminResponse, search })
})

router.get("/search", async (req, res, next) => {
    const { search } = req.query
    console.log(search)
    const result = await request.post(`/board/search`, { search })
    const { response, boardCount } = result.data
    res.render("board/subList.html", { listValue: response, boardCount })
})
router.get("/:mainCd", async (req, res, next) => {
    const { mainCd } = req.params
    const { page } = req.query
    const result = await request.get(`/board/${mainCd}/${page}`)
    const { listValue, cateLength, subVal } = result.data
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
    const tagObjects = boardData.hashResponse.map((tag) => {
        return { value: tag.tag }
    })
    res.render("board/write.modify.html", { mainCd, boardData, tagObjects })
})

// 수정완료하기
router.post("/:mainCd/view/:boardIdx/modify", async (req, res, next) => {
    const { mainCd, boardIdx } = req.params
    let data = {
        subject: req.body.subject,
        content: req.body.content,
        hash: req.body["tags-outside"],
    }
    const result = await request.put(`/board/${mainCd}/${boardIdx}`, { data })
    const { updatedBoard } = result.data
    res.redirect(`/board/${mainCd}/view/${boardIdx}`)
})
// 게시물 1개 확인
router.get("/:mainCd/view/:boardIdx", async (req, res, next) => {
    const { mainCd, boardIdx } = req.params
    const result = await request.get(`/board/${mainCd}/view/${boardIdx}`)
    const {
        data: { response, hashResponse, commentResponse, commentLength, likedUser },
    } = result
    res.render("board/view.html", { newBoard: response, newHashTagVal: hashResponse, commentResponse, commentLength, likedUser })
})
// 게시물 작성 후 확인하기
router.get("/:mainCd/viewcheck/:boardIdx", async (req, res, next) => {
    const { mainCd, boardIdx } = req.params
    const result = await request.get(`/board/${mainCd}/view/${boardIdx}`)
    const {
        data: { response, hashResponse },
    } = result

    res.render("board/view.check.html", { mainCd, newBoard: response, newHashTagVal: hashResponse })
})
// 댓글 삭제하기
router.get("/:mainCd/comment/:cmdIdx", async (req, res, next) => {
    const { mainCd, cmdIdx } = req.params
    const result = await request.delete(`/board/comment/${cmdIdx}`)
    res.redirect(`/board/${mainCd}/view/1`)
})

//제일 밑으로 내려가자
router.get("/:mainCd/:subCd", async (req, res, next) => {
    const { mainCd, subCd } = req.params
    const pagequery = req.query
    const result = await request.get(`/board/${mainCd}/${subCd}/${pagequery.page}`)
    const {
        data: { correctValue, cateLength, subVal },
    } = result
    res.render("board/subList.html", { mainCd, listValue: correctValue, cateLength, subVal })
})

/////////////

module.exports = router
