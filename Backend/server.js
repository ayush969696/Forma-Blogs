require("dotenv").config();
const express = require("express");
//rest object
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const conntectDb = require("./config/db");
const userRouter = require('./routes/userRoutes')
const blogRouter = require('./routes/blogRoutes')

const corsOption = {
    origin: 'http://localhost:5173',
    method: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials: true
}

// handling cors policy issue
app.use(cors(corsOption))

app.use(express.json()); //with this we can get json data from client

// Mongo DB connect
conntectDb();

// router import
app.use('/api/v1/users',userRouter)
app.use('/api/v1/blog',blogRouter)

//middleware
app.use(cors());
app.use(morgan('dev')); // request url, api will shows to console

//router
app.get("/", (req,res) => {
    res.status(200).json({message : "Succesfull Express Start!"})
})

//listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on ${process.env.DEV_MODE} port ${PORT}`.magenta);
})