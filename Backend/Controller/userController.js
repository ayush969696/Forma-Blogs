const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");

//create user register
exports.registerController = async (req, res) => {
  try {
    console.log(req.body);
    
    const {username, email, password} = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please fill all fields",
      });
    }

    // Check if email already exists
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(401).send({
        success: false,
        errorMessage: "User Email already exists!",
      });
    }

    // bcrypt password
    const hasPassword = await bcrypt.hash(password, 10);

    // Save new user
    const user = new userModel({ username, email, password: hasPassword });
    await user.save();

    return res.status(201).send({
      success: true,
      message: "New User is Created!",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in Register Callback",
      success: false,
      error,
    });
  }
};

// get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).send({
      userCount: users.length,
      success: true,
      message: "All user data",
      users
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success:false,
      messsage: "Error in Get All users!",
      error
    })
  }
};

//create user login
exports.loginController = async (req, res) => {
  try {
    const {email, password} = req.body;

    //validation
    if(!email || !password){
      return res.status(400).send({
        success: false,
        errorMessage: "Please provide email or password"
      })
    }

  const user = await userModel.findOne({email});
    if(!user){
      return res.status(400).send({
        success: false,
        errorMessage: "Invalid Email!"
      })
    }

    //password
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
      return res.status(401).send({
        success: false,
        errorMessage: "Invalid username or password!"
      })
    }

    return res.status(200).send({
      success: true,
      message: 'Login Successfull!',
      user
    })

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Login callback",
      error
    })
  }

};
