const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required: [true, "userName is required"],
    },
    email:{
        type:String,
        required: [true, "email is required"],
    },
    password:{
        type:String,
        required: [true, "password is required"],
    },
    blogs: [{
        type: mongoose.Types.ObjectId,
        ref: "Blog"
    }]
}, {timestamps: true})

const userModel = new mongoose.model('user', userSchema);

module.exports = userModel;