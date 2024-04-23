const express = require('express');
const { userController } = require('../Controller/blogController');
const { getAllUsers, registerController, loginController } = require('../Controller/userController');

// router object
const router = express.Router();

router.get('/all-users', getAllUsers)
router.post('/register', registerController)
router.post('/login', loginController)

module.exports = router;