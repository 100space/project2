const express = require("express")
const router = express.Router()
const { boardController: controller } = require("./board.module")

router.post("/write/:categoryMain", (req, res, next) => controller.postWrite(req, res, next))
router.post("/like", (req, res, next) => controller.infoLike(req, res, next))

module.exports = router
