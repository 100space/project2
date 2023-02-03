const express = require('express');
const router = express.Router();
const { boardController: controller } = require("./board.module");

router.post("/write", (req, res, next) => controller.postWrite(req, res, next));



module.exports = router;
