const express = require("express")
//Controller
const userController = require("../Controllers/User")

const router = express.Router()

router.post("/signup", userController.user_signup)
router.post("/signin", userController.user_signin)

module.exports = router