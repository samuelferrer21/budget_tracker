const express = require("express")


const goalsController = require("../../Controllers/Goal")

const router = express.Router()
module.exports = router.get("/:id/goals", goalsController.getgoal)
module.exports = router.post("/:id/add/goal", goalsController.addgoal)
module.exports = router.post("/:id/contribute/goal", goalsController.newcontribution)
module.exports = router.post("/:id/update/goal", goalsController.modifygoals)