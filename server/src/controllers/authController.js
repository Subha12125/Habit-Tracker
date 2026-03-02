const { asyncHandler } = require("../utils/asyncHandler");
const { ApiResponse } = require("../utils/ApiResponse");
const { ApiError } = require("../utils/ApiError");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { verifyJWT } = require("../middlewares/authMiddleware");

//! Register User
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


//! Login User
const loginUser = asyncHandler(async(req , res)=> {
    
    //Get Data from frontend
    const { email, username, password } = req.body;

    //Validation for all the fields
    if(!(email || username) || !password){
        throw new ApiError(400, "Username, email and password are required");
    }

    // Find the user
    const user = await User.findOne({
        $or: [
            { username }, { email }
        ]
    })
    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        throw new ApiError(401, "Invalid password");
    }

    // Generate JWT token
    const token = jwt.sign({
        _id: user._id,
        email: user.email,
        username: user.username
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });


    // set the coolie and reponse
    const options = { httpOnly: true, secure: true };
    const loggedInUser = await User.findById(user._id).select("-password");

    return res
        .status(200)
        .cookie("accessToken", token, options)
        .json(new ApiResponse(200, { user: loggedInUser, accessToken: token }, "Login success"));
})

module.exports = { registerUser, loginUser }