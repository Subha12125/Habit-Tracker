const mongoose = require("mongoose")

const HabitSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    frequency: {
        type: String,
        required: true,
        enum: ["daily", "weekly", "monthly"]
    },
    isArchived: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    log: [
        {
            date: {
                type: Date,
                required: true,
                default: Date.now
            },
            status: {
                type: String,
                enum: ["completed", "skipped", "missed"],
                required: true,
                default: "completed"
            },
            notes: String
        }
    ]
}, { timestamps: true })

module.exports = mongoose.model("Habit", HabitSchema)
