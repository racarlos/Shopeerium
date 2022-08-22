const ControllerError = require("../HttpCodes/ControllerError");

const shopController = function(shopRepository){
    const controller = {

        getShops: async (req,res) => {

            try {
                const shops = await shopRepository.selectShops();

                return res.status(200).json({
                    shops: shops 
                });

            } catch (error) {
                return res.status(error.statusCode).json({    
                    statusCode: error.statusCode,                      
                    message: error.message
                });
            }
 
        },

        getShop: async (req,res) => {
            try {
                
                const sellerUsername = req.params.sellerUsername;

                const shop = await shopRepository.selectShop(sellerUsername);

                return res.status(200).json({
                    shop: shop
                });

            } catch (error) {
                return res.status(error.statusCode).json({    
                    statusCode: error.statusCode,                      
                    message: error.message
                });
            }
        },

        getSelfShop: async (req,res) => {
            try {
                const sellerUsername = req.user.username;

                console.log(`user: ${sellerUsername}`);

                const shop = await shopRepository.selectShop(sellerUsername);

                return res.status(200).json({
                    shop: shop
                });


            } catch (error) {
                return res.status(error.statusCode).json({    
                    statusCode: error.statusCode,                      
                    message: error.message
                });
            }
        },

        postShop: async(req,res) => {
            try {

                const newShop = {
                    sellerUsername: String(req.body.sellerUsername),
                    shopName: String(req.body.shopName),
                    shopLogo: String(req.body.shopLogo),
                    productCount: Number(req.body.productCount),
                    dateJoined: String(req.body.dateJoined),
                    number: Number(req.body.number),
                    email: String(req.body.email)
                }

                console.log(newShop)

                const status = await shopRepository.insertShop(newShop);
                
                return res.status(201).json({
                    newShop: status
                })

                
            } catch (error) {
                return res.status(error.statusCode).json({    
                    statusCode: error.statusCode,                      
                    message: error.message
                });
            }
        },


        deleteShop: async (req,res) => {

            try {
                return res.status(200).json({
                    message: "We'll be implementing delete shop soon hehe." 
                });
            } catch (error) {
                return res.status(error.statusCode).json({    
                    statusCode: error.statusCode,                      
                    message: error.message
                });
            }
        }
    }

    return controller;
}

module.exports = shopController;