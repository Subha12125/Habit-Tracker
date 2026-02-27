const { asyncHandler } = require("../utils/asyncHandler");
const { ApiResponse } = require("../utils/ApiResponse");
const { ApiError } = require("../utils/ApiError");
const User = require("../models/user");
const { verifyJWT } = require("../middlewares/authMiddleware");


const registerUser = asyncHandler(async (req, res) => {

    // Get data from frontend 
    const { username, fullName, email, password } = req.body;
    console.log(email, username);

    // Validation for all the fields
    if (
        [username, fullName, email, password].some((field) => !field || field.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }

    // check for previously exist the user
    const existUser = await User.findOne({
        $or: [
            { username }, { email }
        ]
    })
    if (existUser) {
        throw new ApiError(400, "User already exists");
    }

    // Create new User
    const user = await User.create({
        username, fullName, email, password
    });

    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
        throw new ApiError(500, "User creation failed");
    }

    return res.status(201).json(new ApiResponse(201, createdUser, "User created successfully"));
})



module.exports = { registerUser }