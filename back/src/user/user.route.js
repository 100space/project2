const express = require('express');
const router = express.Router();
const { userController: controller } = require("./user.module");

router.get("/login", (req, res, next) => controller.getSignIn(req, res, next));
router.post("/join", (req, res, next) => controller.postSignUp(req, res, next));
router.put("/profile", (req, res, next) => controller.putUpdateUser(req, res, next));
router.post("/check", (req, res, next) => controller.checkUserid(req, res, next))
router.post("/login", (req, res, next) => controller.getSignIn(req, res, next))


module.exports = router;
