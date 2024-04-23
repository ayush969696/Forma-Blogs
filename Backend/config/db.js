const mongoose = require("mongoose");
const colors = require("colors")

const conntectDb = async () => {
    try {
       await mongoose.connect(process.env.MONGO_URL);
       console.log("MongoDB Connect".magenta);
    } catch (error) {
        console.log(`MongoDB Error : ${error}`.red);
    }
}

module.exports = conntectDb