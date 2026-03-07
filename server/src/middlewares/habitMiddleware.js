const { ApiError } = require("../utils/ApiError");
const { asyncHandler } = require("../utils/asyncHandler");

const Habit = require("../models/habit");
const { model } = require("mongoose");


const checkHabitOwnership = asyncHandler(async (req, res, next) => {
    //! 1.Extract the habitId from params
    const { habitId } = req.params;

    //! 2.Validate the habitId
    if (!habitId) {
        throw new ApiError(400, "HABIT ID IS REQUIRED.");
    }

    //! 3.Find Habit by Id
    const habit = await Habit.findById(habitId);

    //! 4.Validate Habit existence
    if (!habit) {
        throw new ApiError(404, "HABIT NOT FOUND.");
    }

    //? 5.Verify the ownership 
    if (habit.user.toString() !== req.user?._id?.toString()) {
        throw new ApiError(403, "YOU ARE NOT AUTHORIZED TO ACCESS THIS HABIT.");
    }

    //! 6.If everything is fine then attach habit and pass to the next middleware
    req.habit = habit;
    next();
});

module.exports = { checkHabitOwnership };