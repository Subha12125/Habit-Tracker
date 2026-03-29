const { asyncHandler } = require("../utils/asyncHandler");
const { ApiResponse } = require("../utils/ApiResponse");
const { ApiError } = require("../utils/ApiError");
const Habit = require("../models/habit");
const user = require("../models/user");
const { streakCalculator } = require("../services/streakCalculator.js");

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

    // Calculate Steak for each Habit
    const habitsWithStreak = habits.map(habit => {
        const habitObj = habit.toObject();
        habitObj.currentStreak = streakCalculator(habit.log);
        return habitObj;
    })
    return res
    .status(200)
    .json(new ApiResponse(200, habitsWithStreak, "Habits fetched successfully"));
});


//! Log habit Progress

const logHabitProgress = asyncHandler( async(req, res) => {
    const { habitId } = req.params;
    const { status , date, note } = req.body;

    if(!status || !date || !note){
        throw new ApiError(400, "All fields are required");
    }
    
    const habit  = await Habit.findById(habitId);

    if( !habit ) {
        throw new ApiError(404, "Habit not found");
    }

    // verify ownership
    if( habit.user.toString() !== req.user?._id.toString() ){
        throw new ApiError(403, "Unauthorized to log progress for this habit");
    }

    habit.log.push({ 
        status, 
        date: date || Date.now(),
        note
    });

    await habit.save();
    return res
    .status(200)
    .json(new ApiResponse(200, habit, "Habit progress logged successfully"));
})

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


//! Get habit Stats
const getHabitStats = asyncHandler(async(req, res)=> {
    const { habitId } = req.params;
    const habit = await Habit.findById(habitId);

    if( !habit ) {
        throw new ApiError(404, "Habit not found");
    }
    // Filter Completed Logs
    const completedLogs = habit.log.filter(log => log.status === "completed");
    const completedCount = completedLogs.length;

    // Calculate current percentage of completion based on frequency
    const startDate = new Date(habit.createdAt).setHours(0,0,0,0);
    const today = new Date().setHours(0,0,0,0);
    const totalDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) + 1; // Include today
    const successPercentage = totalDays > 0 ? ((completedCount / totalDays) * 100).toFixed(2) : "0.00";

    // Calculate longest streak
    const sortedDates = [...new Set(completedLogs
        .map(entry => new Date(entry.date).setHours(0, 0, 0, 0)))]
        .sort((a, b) => a - b);

    let longestStreak = 0;
    let tempStreak = 0;
    let lastDate = null;

    for (let date of sortedDates) {
        if (lastDate === null || date === lastDate + 86400000) {
            tempStreak++;
        } else {
            tempStreak = 1;
        }
        longestStreak = Math.max(longestStreak, tempStreak);
        lastDate = date;
    }

   const stats = {
        currentStreak: streakCalculator(habit.log),
        longestStreak,
        totalDays,
        successPercentage: `${successPercentage}%`,
        totalLogs: habit.log.length
    };

    return res
        .status(200)
        .json(new ApiResponse(200, stats, "Habit statistics fetched successfully"));
});
module.exports = { createHabit, getAllHabits, deleteHabit, logHabitProgress, getHabitStats };