const express = require("express")

const transactionController = require("../../Controllers/Transaction")

const router = express.Router()

router.post("/:id/addtransaction", transactionController.addtransaction)
router.get("/:id/transactions", transactionController.gettransactions)
router.get("/:id/transactions/total", transactionController.gettotaltransactions)

module.exports = router