const { ApiError } = require("../utils/ApiError");
const { asyncHandler } = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        // get token
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw new ApiError(401, "Unauthorized");
        }

        // decode token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // FIND USER IN THE DATABASE AND EXCLUDE PASSWORD
        const user = await User.findById(decodedToken?._id).select("-password");
        if (!user)
            throw new ApiError(401, "Invalid access token")

        req.user = user;
        next();

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});

module.exports = { verifyJWT }