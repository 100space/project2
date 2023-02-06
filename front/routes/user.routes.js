const express = require("express")
const router = express.Router()
const axios = require("axios")
const upload = require("../midlewares/upload")
const request = axios.create({
    baseURL: "http://127.0.0.1:3000",
    withCredentials: true,
})

router.get("/login", (req, res, next) => {
    res.render("user/login.html")
})

router.post("/login", async (req, res, next) => {
    const response = await request.post("/user/login", {
        ...req.body,
    })
})

router.post("/join", upload.single("userPic"), async (req, res, next) => {
    const response = await request.post("/user/join", {
        ...req.body,
        ...req.file,
    })
    res.render("user/welcome.html", { ...response.data })
})

module.exports = router
