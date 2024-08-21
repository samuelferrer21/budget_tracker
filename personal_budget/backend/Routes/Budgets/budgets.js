const express = require("express")

const budgetController = require("../../Controllers/Budget")

const router = express.Router()


router.get("/:id/budget", budgetController.getBudget)
router.put("/:id/update/allocation", budgetController.changeBudget)
router.put("/:id/update/budget", budgetController.changeTotalBudget)

module.exports = router