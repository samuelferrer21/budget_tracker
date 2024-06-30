const express = require("express")

const transactionController = require("../../Controllers/Transaction")

const router = express.Router()

router.post("/addtransaction", transactionController.addtransaction)
router.get("/gettransactions", transactionController.gettransactions)

module.exports = router