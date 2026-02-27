const router = require("express").Router();

const { registerUser } = require("../controllers/authController");


router.route("/register").post(registerUser);

module.exports = router
