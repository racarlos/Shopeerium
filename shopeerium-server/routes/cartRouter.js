const express = require('express')
const { verifyToken } = require('./authFunctions');

const userRepository = require('../repositories/userRepository')();                // require repository functions
const productRepository = require('../repositories/productRepository')();
const cartRepository = require('../repositories/cartRepository')();
const cartController = require('../controllers/cartController')(cartRepository,userRepository,productRepository)

const cartRouter = express.Router();

// Actual Routes
cartRouter.get('/',cartController.getCarts);
cartRouter.get('/self',verifyToken,cartController.getSelfCart);
cartRouter.post('/checkout',verifyToken,cartController.checkoutCarts);
cartRouter.post('/',verifyToken,cartController.postCart);
cartRouter.delete('/:productId',verifyToken,cartController.deleteCart);
cartRouter.patch('/:username/:productId',verifyToken,cartController.patchCart);


// Export User Router 
module.exports = cartRouter
