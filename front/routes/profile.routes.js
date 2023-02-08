const express = require("express")
const router = express.Router()
const axios = require("axios")
const upload = require("../midlewares/upload")
const request = axios.create({
    baseURL: "http://127.0.0.1:3000",
    withCredentials: true,
})

router.get("/:userId", async (req, res, next) => {
    const { userId } = req.params
    const { boardHot } = req
    const { userHot } = req
    const response = await request.post("/user/check", {
        userId,
    })
    const { data } = response
    res.render("user/mypage.html", {
        ...data,
        boardHot,
        userHot,
    })
})

router.get("/modify/:userId", async (req, res, next) => {
    const { userId } = req.params
    const { boardHot } = req
    const { userHot } = req
    const response = await request.post("/user/check", {
        userId,
    })
    const { data } = response
    res.render("user/mypage.modify.html", {
        ...data,
        boardHot,
        userHot,
    })
})

router.post("/modify/:id", async (req, res, next) => {
    const { id } = req.params
    console.log(req.body, 12312321, "======")
    const { boardHot } = req
    const { userHot } = req
    const response = await request.put(`/profile/${id}`, {
        ...req.body,
    })
    console.log(response, "here")
    res.render("user/mypage.html", { ...response.data, boardHot, userHot })
})

module.exports = router
