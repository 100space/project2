const express = require("express")
const app = express()
const config = require("./config")
const nunjucks = require("nunjucks")
const axios = require("axios")
const port = config.port
const router = require("./routes")
const cors = require("cors")

app.use(
    cors({
        origin: true,
        credentials: true,
    })
)

app.set("view engine", "html")
nunjucks.configure("views", { express: app })

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static("public"))

app.use(router)

app.listen(port, async () => {
    console.log(`front server open`)
})
