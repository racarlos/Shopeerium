const bodyParser = require('body-parser');
const express = require('express');

const productRepository = require('../repositories/productRepository')();           // require repository functions
const categoryRepository = require('../repositories/categoryRepository')();
const controller = require('../controllers/categoryController')(categoryRepository,productRepository);

const categoryRouter = express.Router()

// MIddle Ware 
categoryRouter.use(bodyParser.json());
categoryRouter.use(bodyParser.urlencoded({extended: true}));

// Actual Routes
categoryRouter.get('/',controller.getCategories);
categoryRouter.post('/',controller.postProductCategory);
categoryRouter.delete('/',controller.deleteProductCategory);


// Export Category Router 
module.exports = categoryRouter;