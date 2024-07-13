const express = require("express")

const categoryController = require("../../Controllers/Categories")

const router = express.Router()

router.get("", categoryController.getcategories)

module.exports = router