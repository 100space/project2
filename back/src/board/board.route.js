const express = require("express")
const router = express.Router()
const { boardController: controller } = require("./board.module")

router.post("/picture", (req, res, next) => controller.pictureInsert(req, res, next))
router.get("/random", (req, res, next) => controller.getRandom(req, res, next))
router.get("/hot", (req, res, next) => controller.getHot(req, res, next))
router.get("/:categoryMain", (req, res, next) => controller.findCategory(req, res, next))
router.get("/:categoryMain/:categorySub", (req, res, next) => controller.findCategorySub(req, res, next))
router.get("/:categoryMain/:categorySub/:pagingindex", (req, res, next) => controller.findPagingValue(req, res, next))

router.post("/write/:categoryMain", (req, res, next) => controller.postWrite(req, res, next))
router.post("/:categoryMain/view/like", (req, res, next) => controller.infoLike(req, res, next))
router.post("/:categoryMain/view", (req, res, next) => controller.findBoard(req, res, next))

router.put("/:categoryMain/view", (req, res, next) => controller.findBoard(req, res, next))

router.delete("/:categoryMain/:boardIdx", (req, res, next) => controller.deleteBoard(req, res, next))



module.exports = router
