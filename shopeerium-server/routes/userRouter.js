const express = require('express');
const { verifyToken } = require('./authFunctions');

const cartRepository = require('../repositories/cartRepository')();
const productRepository = require('../repositories/productRepository')();
const userRepository = require('../repositories/userRepository')();                                                // require repository functions
const controller = require('../controllers/userController')(userRepository,cartRepository,productRepository);     // inject repository functions to controller 

const userRouter = express.Router();


// Actual Routes 
userRouter.get('/',controller.getUsers);
userRouter.get('/self',verifyToken,controller.getSelf);
userRouter.get('/:username',controller.getUser);
userRouter.post('/',controller.postUser);
userRouter.delete('/:username',controller.deleteUser);
userRouter.put('/:username',controller.putUser);

// Export User Router and Users Array
module.exports = userRouter;
