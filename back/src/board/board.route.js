const express = require('express');
const router = express.Router();
const { boardController: controller } = require("./board.module");

router.get("/write", (req, res, next) => controller.getWrite(req, res, next));



module.exports = router;
