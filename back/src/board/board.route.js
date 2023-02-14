const express = require("express")
const router = express.Router()
const { boardController: controller } = require("./board.module")

router.post("/picture", (req, res, next) => controller.pictureInsert(req, res, next))
router.get("/random", (req, res, next) => controller.getRandom(req, res, next))
router.get("/hot", (req, res, next) => controller.getHot(req, res, next))
router.post("/search", (req, res, next) => controller.searchValue(req, res, next))
router.post("/list/search", (req, res, next) => controller.searchListValue(req, res, next))
//comment 작성하기
router.post("/comment/:boardIdx", (req, res, next) => controller.postComment(req, res, next))

// 리팩토링할 코드
// 리팩토링 코드 끝

// 기본 CRUD
router.post("/:mainCd/write", (req, res, next) => controller.postWrite(req, res, next))
router.get("/:mainCd/view/:boardIdx", (req, res, next) => controller.findBoard(req, res, next))
router.put("/:mainCd/view/:boardIdx", (req, res, next) => controller.changeBoard(req, res, next))
router.delete("/:mainCd/view/:boardIdx", (req, res, next) => controller.deleteBoard(req, res, next))

// 기본 CRUD 끝

// 카테고리별 내용 불러오기
router.get("/:mainCd/:pageNumber", (req, res, next) => controller.findMainCd(req, res, next))
router.get("/:mainCd/:subCd/:pageNumber", (req, res, next) => controller.findCategorySub(req, res, next))

// router.get("/:categoryMain", (req, res, next) => controller.findCategory(req, res, next))
// router.post("/:categoryMain/view/like", (req, res, next) => controller.infoLike(req, res, next))
module.exports = router
