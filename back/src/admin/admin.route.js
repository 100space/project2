const express = require("express")
const router = express.Router()
const { adminController : controller } = require("./admin.module")

router.get("/admin/users", controller.getUsers)
router.put("/admin/users/:id", controller.updateUser)
router.get("/admin/boards", controller.getBoards)
router.put("/admin/boards/:id", controller.updateBoardLevel)
router.get("/admin/categories", controller.getCategories)
router.post("/admin/categories", controller.createCategory)
router.put("/admin/categories/:id", controller.updateCategory)
router.delete("/admin/categories/:id", controller.deleteCategory)

module.exports = router
