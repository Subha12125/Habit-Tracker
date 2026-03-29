// In c:\Full Stack Projects\HabitTracker\server\src\routes\habitRoute.js
const express = require("express");
const { createHabit, getAllHabits, deleteHabit, logHabitProgress, getHabitStats } = require("../controllers/habitController");
const { verifyJWT } = require("../middlewares/authMiddleware");


const router = express.Router();

// All habit routes require authentication
router.use(verifyJWT); 

router.route("/").post(createHabit).get(getAllHabits);
router.route("/:habitId").delete(deleteHabit);
router.route("/:habitId/log").post(logHabitProgress);
router.route("/:habitId/stats").get(getHabitStats);
module.exports = router;