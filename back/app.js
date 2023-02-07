const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const app = express()

app.use(cookieParser())
app.use(cors({ origin: true, credentials: true }))
app.use(express.json({ limit: "1024mb" }))
app.use(express.urlencoded({ limit: "1024mb", extended: false }))
app.use((error, req, res, next) => {
    res.status(500).send(error.message)
})

module.exports = app
