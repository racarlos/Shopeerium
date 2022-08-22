const bodyParser = require('body-parser');
const express = require('express');
const { verifyToken } = require('./authFunctions');

 // require repository functions
const userRepository = require('../repositories/userRepository')();                    
const productRepository = require('../repositories/productRepository')();        
const cartRepository = require('../repositories/cartRepository')();
           
const controller = require('../controllers/productController')(productRepository,userRepository,cartRepository);

const productRouter = express.Router();

// MIddle Ware 
productRouter.use(bodyParser.json());
productRouter.use(bodyParser.urlencoded({extended: true}));

// Actual Routes
productRouter.get('/search',controller.searchProducts);
productRouter.get('/', controller.getProducts);
productRouter.get('/:productId', controller.getProduct);
productRouter.post('/',verifyToken,controller.postProduct);
productRouter.delete('/:productId',verifyToken,controller.deleteProduct);
productRouter.put('/:productId',verifyToken,controller.putProduct);

// Export Product Router and Products Array
module.exports = productRouter;