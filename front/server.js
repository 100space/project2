const express = require("express")
const app = express()
const nunjucks = require("nunjucks")
const router = require("./routes")

app.set("view engine", "html")
nunjucks.configure("views", { express: app })

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static("public"))

app.use(router)

app.listen(3005, async () => {
    console.log("front server open")
})
