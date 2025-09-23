const express = require("express");
const workoutController = require("../controllers/workoutControllers");
const { verify } = require("../auth");

const router = express.Router();

router.post("/addWorkout", verify, workoutController.addWorkout);
router.get("/getMyWorkouts", verify, workoutController.getMyWorkouts);
router.patch("/updateWorkout/:id", verify, workoutController.updateWorkout);
router.delete("/deleteWorkout/:id", verify, workoutController.deleteWorkout);
router.post("/completeWorkoutStatus/:id", verify, workoutController.completeWorkoutStatus);

module.exports = router;