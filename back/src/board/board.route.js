const express = require('express');
const router = express.Router();
const { boardController: controller } = require("./board.module");

router.post("/write", (req, res, next) => controller.postWrite(req, res, next));
router.get("/view/like/:boardIdx", (req, res, next) => controller.infoLike(req, res, next))


module.exports = router;
