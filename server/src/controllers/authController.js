const { asyncHandler } = require("../utils/asyncHandler");
const { ApiResponse } = require("../utils/ApiResponse");
const { ApiError } = require("../utils/ApiError");
const User = require("../models/user");


const registerUser = asyncHandler(async (req, res) => {

    // Get data from frontend 
    const { username, fullname, email, password } = req.body;
    console.log(email, username);

    // Validation for all the fields
    if([username , fullname, email, password].some((field) => field?.trim() === "")){
        throw new ApiError(400, "All fields are required");
    }

    // check for previously exist the user
    const existUser = await User.findOne({
        $or: [
            { username}, {email}
        ]
    })
    if(existUser){
        throw new ApiError(400, "User already exists");
    }

    // Create new User
    const createUser = await User.create({
        username, fullname, email, password
    });

    if(!createUser){
        throw new ApiError(400, "User creation failed");
    }

    return res.status(201).json(new ApiResponse(201, createUser, "User created successfully"));
})



module.exports = { registerUser }