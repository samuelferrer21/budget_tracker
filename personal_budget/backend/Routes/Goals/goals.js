const express = require("express")


const goalsController = require("../../Controllers/Goal")

const router = express.Router()
module.exports = router.get("/getgoal", goalsController.getgoal)
module.exports = router.post("/addgoal", goalsController.addgoal)
module.exports = router.post("/contributegoal", goalsController.newcontribution)
module.exports = router.post("/modifygoal", goalsController.modifygoals)