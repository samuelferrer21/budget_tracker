const express = require("express")

const categoryController = require("../../Controllers/Categories")

const router = express.Router()

router.get("/getcategories", categoryController.getcategories)

module.exports = router