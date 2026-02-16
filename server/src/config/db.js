const { default: mongoose } = require("mongoose");
const { DB_NAME } = require("../constants");

const connectDB = async() => {
    try{
        const connectInstance = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MongoDB connected: ${connectInstance.connection.host}`)
    }catch(error){
        console.log(`MongoDB connection error: ${error.message}`)
        process.exit(1)
    }
}

module.exports = connectDB
