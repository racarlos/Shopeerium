const express = require('express');


const userRepository = require('../repositories/userRepository')();
const controller = require('../controllers/authController')(userRepository)


const authRouter = express.Router();


authRouter.post('/login',controller.login)


module.exports = authRouter;