const ControllerError = require("../HttpCodes/ControllerError");
const nanoid = require('nanoid')

const productController = function(productRepository,userRepository,cartRepository){

    const controller = {
        
        // GET the list of all products
        getProducts: async (req,res) => {


            const sellerUsername = req.query.sellerUsername;
            const category = req.query.category;

            try {
                if(sellerUsername){         // Searching by Seller

                    const validSeller = await userRepository.selectUser(sellerUsername);  // Check if Valid Seller 
                    if(!validSeller.username){
                        throw new ControllerError(404,`Error! User: ${sellerUsername} does not exist in the database.`);
                    }

                    if(validSeller.role !== "seller"){
                        throw new ControllerError(400,`Bad Request! User: ${sellerUsername} is not a seller.`);
                    }

                    const productsBySeller = await productRepository.selectProductbySeller(sellerUsername)
                
                    if(productsBySeller.length === 0 ){
                        throw new ControllerError(404,`Error! User: ${sellerUsername} does not  have any products in the database.`);
                    }

                    return res.status(200).json({                              // Send all Products
                        productCount: productsBySeller.length,
                        products: productsBySeller
                    })

                } else if (category) {      // Searching by category 

                    const productsByCategory = await productRepository.selectProductbyCategory(category)
                    if(productsByCategory.length === 0){
                        throw new ControllerError(404,`Error! Category: ${category} does not have any products in the database.`);
                    }

                    return res.status(200).json({                              // Send all Products
                        productCount: productsByCategory.length,
                        products: productsByCategory
                    })

                } else {
                    const products = await productRepository.selectProducts();
                    if(products.length === 0){
                        throw new ControllerError(404,`There are no Products in the Database`)
                    }
                    return res.status(200).json({                              // Send all Products
                        products: products
                    })
                }

            } catch (error) {
                console.error(error);
                return res.status(error.statusCode).json({                          
                    message: error.message
                });
            }
        },

        // GET Single Product - REDIS 
        getProduct: async (req,res) => {

            const productId = parseInt(req.params.productId)

            try {
                const product = await productRepository.selectProduct(productId);
                
                if(product.productId){    
                    return res.status(200).json({                          
                        product: product
                    })
                } else {
                    throw new ControllerError(404,`Error! Product: ${productId} does not exist in the database.`)
                }

            } catch (error) {
                console.error(error);
                return res.status(error.statusCode).json({                          
                    message: error.message
                });
            }
        },

        searchProducts: async (req,res) => {

            let  pattern = String(req.query.pattern);

            try {

                if(pattern){
                    pattern = '%' + pattern + '%';
                    console.log(pattern);
               
                    const matches = await productRepository.searchProducts(pattern);

                    return res.status(200).json({                          
                        products: matches
                    })
                } else {
                    return res.status(404).json({                          
                        message: "Error !No search pattern sent."
                    })
                } 
            } catch (error) {
                console.error(error);
                return res.status(error.statusCode).json({                          
                    message: error.message
                });
            }
        },


        postProduct: async (req,res) => {

            // Generate New product ID using nanoid
            const productId = Number(nanoid.customAlphabet('1234567890',4)());

            const newProduct = {
                productId: productId,
                sellerUsername: req.body.sellerUsername,
                title: req.body.title,
                imgUrl: String(productId) + '.jpg',
                price: Number(req.body.price),
                stock: parseInt(req.body.stock),
                amountSold: 0,
                categories: req.body.category,
                description: req.body.description 
            }

            console.log("====================");
            console.log("Inserting Product: ")
            console.log(newProduct)
            console.log("====================");

 
            try {
                const userSeller = await userRepository.selectUser(newProduct.sellerUsername);
                
                // Check if seller exists in the db 
                if(!userSeller.username){
                    throw new ControllerError(404,`Error! User: ${newProduct.sellerUsername} does not exist in the database.`);
                }

                // Check if the seller really is a seller
                if(userSeller.role !== "seller"){
                    throw new ControllerError(400,`Bad Request! User: ${sellerUsername} is not a seller.`);
                }

                // Check if Product ID already exists in the database 
                const validProduct = await productRepository.selectProduct(productId)

                if(Object.keys(validProduct).length !== 0){
                    throw new ControllerError(409,`Product Creation Failed! Product ID ${productId} already exists in the database.`)
                } else {
                    
                    const createProduct = await productRepository.insertProduct(newProduct)

                    return res.status(201).json({
                        message: `Success! Product ID: ${newProduct.productId} has been added to the database`,
                        newProduct: newProduct      
                    })
                }

            } catch (error) {
                console.error(error)
                return res.status(error.statusCode).json({                          
                    message: error.message
                });
            }
        },

        deleteProduct: async (req,res) => {
            try {
                const productId = parseInt(req.params.productId)
                const sender = String(req.user.username);
                const senderRole = String(req.user.role);

                // Check if the product to be deleted exists in the database 
                const validProduct = await productRepository.selectProduct(productId)            
                if(!validProduct.productId){
                    throw new ControllerError(404,`Error! Product ${productId} does not exist in the database.`) 
                }
                
                // Only seller can delete their own Products
                if(validProduct.sellerUsername !== sender || senderRole !== 'seller'){
                    throw new ControllerError(401,`Error! Invalid Sender:${sender}-${senderRole}. Only seller can delete their own products`)
                }

                const [deleteProduct] = await productRepository.deleteProduct(productId)
                return res.status(200).json({
                    message: `Success! Product ID: ${productId} has been deleted from the database`,                
                })

                
            } catch (error) {
                console.error(error)
                return res.status(error.statusCode).json({                          
                    message: error.message
                });
            }
 
        },

        putProduct: async (req,res) => {

            try {

                const sender = String(req.user.username);
                const senderRole = String(req.user.role);
    
                const productToUpdate = {
                    productId: parseInt(req.body.productId),
                    sellerUsername: req.body.sellerUsername,
                    title: req.body.title,
                    imgUrl: req.body.imgUrl,
                    price: Number(req.body.price),
                    stock: parseInt(req.body.stock),
                    amountSold: parseInt(req.body.amountSold),
                    categories: req.body.category,
                    description: req.body.description
                }

                // Only seller can delete their own Products
                if(sender !== productToUpdate.sellerUsername || senderRole !== 'seller'){
                    throw new ControllerError(403,`Error Product Update Request has invalid sender: ${sender} with role: ${senderRole}`);
                }

                // Add checking if seller Exists in the Users Table
                const userSeller = await userRepository.selectUser(productToUpdate.sellerUsername);
                if(!userSeller.username){
                    throw new ControllerError(404,`Error! User: ${productToUpdate.sellerUsername} does not exist in the database.`);
                }

                const updatedProductOnCart = {
                    productId: parseInt(req.body.productId),
                    title: req.body.title,
                    imgUrl: String(req.body.imgUrl),
                    price: Number(req.body.price),
                    stock: parseInt(req.body.stock)
                };

                const updateCarts = await cartRepository.updateCartOnProductUpdate(updatedProductOnCart);

                const [updateProduct] = await productRepository.updateProduct(productToUpdate);
                return res.status(200).json({
                    message: `Success! Product ID: ${productToUpdate.productId} has been updated!`,
                    updatedProduct: productToUpdate                
                });

            } catch (error) {
                console.error(error);
                return res.status(error.statusCode).json({                          
                    message: error.message
                });
            }
        }

    }
    return controller;
}

module.exports = productController