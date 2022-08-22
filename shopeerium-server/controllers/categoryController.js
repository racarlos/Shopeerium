const ControllerError = require("../HttpCodes/ControllerError");

const categoryController = function(categoryRepository,productRepository){

    const controller = {

        // Returns all disctinct categories or categories of a given productId
        getCategories: async (req,res) => {                             
            try {

                const productId = parseInt(req.query.productId); 

                const [categories] = await categoryRepository.selectCategories()                                    // Check if there any categories in the database
                if(categories[0].length === 0){
                    throw new ControllerError(404,`There are no Categories in the Database`)    
                }

                if(productId){
                    const [product] = await productRepository.selectProduct(productId)                              // Check if product exists in the database
                    if(product[0].length === 0){
                        throw new ControllerError(404,`Error! Product: ${productId} does not exist in the database.`)
                    }
    
                    const [productCategories] = await categoryRepository.selectProductCategories(productId)         // If there are no categories realted to product then throw error
                    if(productCategories[0].length === 0){
                        throw new ControllerError(404,`Product :${productId} is not associated with any category.`)
                    }
    
                    return res.status(200).json({                              // Send all Categories 5
                        productId: productId,
                        categories: productCategories[0]
                    })

                } else {
                    const [categories] = await categoryRepository.selectCategories()        // If no productId is specified then send all Categories
                    if(categories[0].length === 0){
                        throw new ControllerError(404,`There are no Categories in the Database`)
                    }

                    return res.status(200).json({                              // Send all Categories 
                        categoryCount: categories[0].length,
                        categories: categories[0]
                    })
                }

            } catch (error) {
                return res.status(error.statusCode).json({                          
                    message: error.message
                });
            }
        },  

        postProductCategory: async (req,res) => {
            try {
                const productId = parseInt(req.body.productId)
                const category = req.body.category

                const [categories] = await categoryRepository.selectCategories()                                         // Check if there any categories in the database
                if(categories[0].length === 0){
                    throw new ControllerError(404,`There are no Categories in the Database`)    
                }

                const [product] = await productRepository.selectProduct(productId)                                      // Check if product exists in the database
                if(product[0].length === 0){
                    throw new ControllerError(404,`Error! Product: ${productId} does not exist in the database.`)
                }

                const [currentCategory] = await categoryRepository.selectProductCategory(productId,category);            // Check if product is already associated with selected category
                if(currentCategory[0].length === 0){
                    const [insertCategory] = await categoryRepository.insertProductCategory(productId,category);
                    return res.status(200).json({
                        message: `Success! Product ID: ${productId} has been added to Category: ${category}`,                
                    })

                } else {
                    throw new ControllerError(409,`Category Insertion Failed! Product ID ${productId} is already in Category ${category}.`)
                }

            } catch (error) {
                console.error(error)
                return res.status(error.statusCode).json({                          
                    message: error.message
                });
            }
        },

        deleteProductCategory: async (req,res) => {
            try {
                const productId = req.body.productId
                const category = req.body.category

                const [categories] = await categoryRepository.selectCategories()                                // Check if there any categories in the database
                if(categories[0].length === 0){
                    throw new ControllerError(404,`There are no Categories in the Database`)    
                }

                const [product] = await productRepository.selectProduct(productId)                              // Check if product exists in the database
                if(product[0].length === 0){
                    throw new ControllerError(404,`Error! Product: ${productId} does not exist in the database.`)
                }

                const [currentCategory] = await categoryRepository.selectProductCategory(productId,category);            // Check if product is already associated with selected category
                console.log(currentCategory)

                if(currentCategory[0].length === 0){
                    throw new ControllerError(400,`Category Deletion Failed! Product ID ${productId} is not in Category ${category}.`)
                } else {
                    const [deleteCategory] = await categoryRepository.deleteProductCategory(productId,category);
                    return res.status(200).json({
                        message: `Success! Product ID: ${productId} has been removed from Category: ${category}`,                
                    })
                }
            } catch (error) {
                console.error(error)
                return res.status(error.statusCode).json({                          
                    message: error.message
                });
            }
        },
    }

    return controller;
}

module.exports = categoryController