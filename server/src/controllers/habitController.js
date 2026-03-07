const { asyncHandler } = require("../utils/asyncHandler");
const { ApiResponse } = require("../utils/ApiResponse");
const { ApiError } = require("../utils/ApiError");
const Habit = require("../models/habit");
const user = require("../models/user");

//! Create Habit

const createHabit = asyncHandler(async(req , res)=>{
    const { title, description, frequency } = req.body;

    // Validation for all the fields
    if([title, description, frequency].some((field)=> !field || field.trim()==="")){
        throw new ApiError(400, "All fields are required");
    }
    
    //? Assign new Habit
    const habit = await Habit.create({
        title,
        description,
        frequency,
        user: req.user?._id,
    });

    return res
    .status(201)
    .json(new ApiResponse(201, habit, "Habit created successfully"));
});


//! Get all Habits of user
const getAllHabits = asyncHandler(async(req, res)=>{
    const habits = await Habit.find({ user: req.user?._id }).sort({ createdAt: -1 });

    return res
    .status(200)
    .json(new ApiResponse(200, habits, "Habits fetched successfully"));
});

//! Delete Habit
const deleteHabit = asyncHandler(async(req, res)=>{
    // Since checkHabitOwnership middleware already found the habit, 
    // we can use req.habit._id directly.
    const habitId = req.habit?._id || req.params.habitId;

    await Habit.findByIdAndDelete(habitId);

    return res
    .status(200)
    .json(new ApiResponse(200, null, "Habit deleted successfully"));
});


module.exports = { createHabit, getAllHabits, deleteHabit };