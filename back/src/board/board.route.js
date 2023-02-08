const express = require("express")
const router = express.Router()
const { boardController: controller } = require("./board.module")

router.post("/write/:categoryMain", (req, res, next) => controller.postWrite(req, res, next))
router.post("/:categoryMain/view/like", (req, res, next) => controller.infoLike(req, res, next))
router.put("/:categoryMain/view", (req, res, next) => controller.findBoard(req, res, next))
router.delete("/:categoryMain/:boardIdx", (req, res, next) => controller.deleteBoard(req, res, next))


module.exports = router
