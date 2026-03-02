const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })

userSchema.pre("save", async function(){
    if(!this.isModified("password")) return ;
    const hashPassword = await bcrypt.hash(this.password, 10);
    this.password = hashPassword;
})

module.exports = mongoose.model("User", userSchema)
