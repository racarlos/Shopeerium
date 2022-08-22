const express = require('express');
const { verifyToken } = require('./authFunctions');

const shopRepository = require('../repositories/shopRepository')();
const shopController = require('../controllers/shopController')(shopRepository);

const shopRouter = express.Router();

shopRouter.get('/',shopController.getShops);                      // get all shops
shopRouter.get('/self',verifyToken,shopController.getSelfShop);   // get only the callers shop's detail
shopRouter.get('/:sellerUsername',shopController.getShop);        // get a single shop 
shopRouter.post('/',shopController.postShop);                   // delete a single shop 

module.exports = shopRouter;