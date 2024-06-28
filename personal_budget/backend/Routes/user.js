const express = require("express")
//Controller
const userController = require("../Controllers/User")

const router = express.Router()

router.post("/signup", userController.user_signup)

module.exports = router