const ControllerError = require("../HttpCodes/ControllerError")

const cartController = function(cartRepository,userRepository,productRepository) {

    // Controller Function names are based on HTTP METHODS
    // Repository Function names are based on SQL METHODS 
    const controller = {


        checkoutCarts: async(req,res) => {
            const username = String(req.user.username);
            const cartList = req.body; 

            try{

                if(!typeof(cartList) === 'object' || cartList.length === 0 || JSON.stringify(cartList) === '{}' ){                  
                    throw new ControllerError(400,"Request Body is incorrectly formatted or empty");
                }

                if(req.user.role !== 'buyer'){
                    throw new ControllerError(400,`Error! User: ${username} is not a buyer and does not have a cart.`) 
                }

                // For Each Cart Decrease Product Quantity and all carts of the same productId, delete cart in user's cartg   
                for(const cart of cartList){

                    let productId = cart.productId;
                    let quantity = cart.quantity;

                    const validProduct = await productRepository.selectProduct(productId)
                    if(!validProduct){
                        throw new ControllerError(404,`Error! Product ID: ${productId} does not exist in the database.`) 
                    }

                    if(validProduct.stock < quantity){
                        const message = `Bad Request! Requested Quantity is greater than Product's remaining stock. ` 
                        const message2 = `remainingStock: ${validProduct.stock } | quantityRequested: ${quantity}`
                        throw new ControllerError(400,message+message2)
                    }

                    // Check if cart is in users cart
                    const validCart = await cartRepository.selectCart(username,productId);
                    if(!validCart){
                        throw new ControllerError(404,`Error! Product ID: ${productId} does not exist in Cart's of User:${username}.`) 
                    }

                    newStock = Number(validProduct.stock) - quantity;                      // Decrement Product Quantity  
                    newAmountSold = Number(validProduct.amountSold) + quantity;            // Increment Product Amount Sold 
                    categories = JSON.parse(validProduct.categories);

                    const productToUpdate = {
                        productId: parseInt(validProduct.productId),
                        sellerUsername: validProduct.sellerUsername,
                        title: validProduct.title,
                        imgUrl: validProduct.imgUrl,
                        price: Number(validProduct.price),
                        stock: newStock,
                        amountSold: newAmountSold,
                        categories: validProduct.categories,
                        description: validProduct.description
                    }

                    // Update product stock and amount sold on products table
                    const task1 = productRepository.updateProduct(productToUpdate);

                    // Update the stock left on carts table
                    const task2 = cartRepository.updateCartOnCheckout(productId,newStock,quantity);

                    // Lastly, delete the cart in user's table 
                    const task3 = cartRepository.deleteCart(username,productId)

                    const results = await Promise.all([task1,task2,task3]);
                }

                return res.status(200).json({
                    message: "Success! Cart Has been Checked out",
                    body: req.body
                })

            }catch(error){
                console.error(error);
                return res.status(error.statusCode).json({                          
                    message: error.message,
                });
            }
        },
        
        getCarts: async (req,res) => {
            try {
                const carts = await cartRepository.selectCarts();

                if(carts.length === 0){
                    throw new ControllerError(404,`There are no Carts in the Database`);
                } else {
                    return res.status(200).json({                              // Send all Products
                        carts: carts
                    });                    
                }

            } catch (error) {
                return res.status(error.statusCode).json({                          
                    message: error.message,
                });
            }
        },

        // GET the user's own cart based on jwt
        getSelfCart: async (req,res) => {

            const username = String(req.user.username);

            try {
                
                const validUser = await userRepository.selectUser(username)
                if(!validUser.username){
                    throw new ControllerError(404,`Error! User ${username} does not exist in the database.`)
                }

                if(validUser.role !== 'buyer'){
                    throw new ControllerError(400,`Error! User: ${username} is not a buyer and does not have a cart.`) 
                }

                const userCart = await cartRepository.selectUserCarts(username)
        
                if(userCart.length === 0){
                    return res.status(200).json({                      
                        message: `User: ${username}'s cart is empty.`
                    })
                } else {
                    return res.status(200).json({                      
                        carts: userCart
                    })
                }
            } catch (error) {
                console.error(error);
                return res.status(error.statusCode).json({                          
                    message: error.message,
                });
            }


        },

        postCart: async (req,res) => {

            const username = req.user.username
            const productId = parseInt(req.body.productId)
            const sellerUsername = req.body.sellerUsername
            const title = req.body.title
            const imgUrl = req.body.imgUrl
            const price = Number(req.body.price)
            const stock = parseInt(req.body.stock)
            const quantity = parseInt(req.body.quantity)


            try {

                // CHECK IF CART IS ALREADY IN THE DATABASE 

                // Check if Quantity is valid, should be at least 1
                if(quantity <= 0){
                    throw new ControllerError(400,`Bad Request! Requested Quantity must be at least 1!`)
                }

                // Check if user is in the database
                const validUser = await userRepository.selectUser(username) 
                if(!validUser.username){          
                    throw new ControllerError(404,`Error! User ${username} does not exist in the database.`)
                }

                if(validUser.role !== 'buyer'){
                    throw new ControllerError(400,`Error! User: ${username} is not a buyer and does not have a cart.`) 
                }
    
                // Checks if the product is in the db
                const validProduct = await productRepository.selectProduct(productId)
                if(!validProduct.productId){
                    throw new ControllerError(404,`Error! Product ID: ${productId} does not exist in the database.`) 
                }
    
                // Check if product has enough quantity
                if(stock < quantity){
                    const message = `Bad Request! Requested Quantity is greater than Product's remaining stock. ` 
                    const message2 = `remainingStock: ${stock} | quantityRequested: ${quantity}`
                    throw new ControllerError(400,message+message2)
                }

                const validCart = await cartRepository.selectCart(username,productId);

                if(typeof validCart != 'undefined'){                // If Cart Already Exists Just Update Quantity

                    const updateCart = await cartRepository.updateCart(username,productId,quantity);
                    return res.status(200).json({
                        message: `Success! Cart entry has been updated in the database`,                
                    })

                } else {                                            // If Cart does not yet exist then add new entry 

                    const newCart = {
                        username: username,
                        productId: productId,
                        sellerUsername : sellerUsername,
                        title: title,
                        imgUrl: imgUrl,
                        price: price,
                        stock: stock,
                        quantity: quantity
                    }
    
                    const [createCart] = await cartRepository.insertCart(newCart)                 // Insert the New Cart into the database
                    return res.status(201).json({
                        message: `Success! Cart has been added to the database`,                
                    })
                }


            } catch (error) {
                console.error(error);
                return res.status(error.statusCode).json({                          
                    message: error.message,
                });
            }
        },

        deleteCart: async (req,res) => {

            const username = String(req.user.username);
            const productId = parseInt(req.params.productId);

            try {
                // Check if user is in the database
                const validUser = await userRepository.selectUser(username) 
                if(!validUser.username){          
                    throw new ControllerError(404,`Error! User ${username} does not exist in the database.`)
                }

                if(validUser.role !== 'buyer'){
                    throw new ControllerError(400,`Error! User: ${username} is not a buyer and does not have a cart.`) 
                }
    
                // Checks if the product is in the db
                const validProduct = await productRepository.selectProduct(productId)
                if(!validProduct.productId){
                    throw new ControllerError(404,`Error! Product ID: ${productId} does not exist in the database.`) 
                }

                // Check if the product is in the user's cart
                const cartToBeDeleted = await cartRepository.selectCart(username,productId);
                if(!cartToBeDeleted.username){
                    throw new ControllerError(404,`Error! No Product: ${productId} in User: ${username}'s cart.`) 
                }

                const [deleteCart] = await cartRepository.deleteCart(username,productId)
                return res.status(200).json({
                    message: `Success! Cart has been deleted from the database.`,                
                })

            } catch (error) {
                return res.status(error.statusCode).json({                          
                    message: error.message,
                });
            }
        },

        patchCart: async (req,res) => {
            const username = req.params.username
            const productId = parseInt(req.params.productId)
            const quantity = parseInt(req.body.quantity)
            
            try {

                // Check if Quantity is valid, should be at least 1
                if(quantity <= 0){
                    throw new ControllerError(400,`Bad Request! Requested Quantity must be at least 1!`)
                }

                // Check if user is in the database
                const validUser = await userRepository.selectUser(username) 
                if(!validUser.username){          
                    throw new ControllerError(404,`Error! User ${username} does not exist in the database.`)
                }

                if(validUser.role !== 'buyer'){
                    throw new ControllerError(400,`Error! User: ${username} is not a buyer and does not have a cart.`) 
                }
    
                // Checks if the product is in the db
                const validProduct = await productRepository.selectProduct(productId)
                if(!validProduct.productId){
                    throw new ControllerError(404,`Error! Product ID: ${productId} does not exist in the database.`) 
                }
    
                // Check if product has enough quantity
                if(validProduct.stock < quantity){
                    const message = `Bad Request! Requested Quantity is greater than Product's remaining stock. ` 
                    const message2 = `remainingStock: ${stock} | quantityRequested: ${quantity}`
                    throw new ControllerError(400,message+message2)
                }

                // Check if the product is in the user's cart
                const cartToBeUpdated = await cartRepository.selectCart(username,productId)   
                if(!cartToBeUpdated.username){
                    throw new ControllerError(404,`Error! No Product: ${productId} in User: ${username}'s cart.`) 
                }
    
                const [updateCart] = await cartRepository.updateCart(username,productId,quantity)
                return res.status(200).json({
                    message: `Success! User: ${username}'s Cart has been updated!`,                
                })
                
                
            } catch (error) {
                return res.status(error.statusCode).json({                          
                    message: error.message,
                });
            }
        },

    } // end of controller

    return controller;
}


module.exports = cartController