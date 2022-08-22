const knex = require('./knex');
const RepositoryError = require('../HttpCodes/RepositoryError')


const cartRepository = function(){
    const repository = {                // Object of List of DB Functions 

        selectCarts: async () => {
            try{
                const data =  await knex.raw(`CALL selectCarts();`)
                return data [0][0]
            } catch (error){
                console.error(error)
                throw new RepositoryError(`SELECT all Carts Failed | ${error.sqlMessage}`)
            }
        },
            
        selectUserCarts: async (username) => {
            try{
                const data = await knex.raw(`CALL selectUserCarts(?);`,[username]);
                return data[0][0];

            } catch(error){
                console.error(error)
                throw new RepositoryError(`SELECT all Carts of User:${username} Failed | ${error.sqlMessage}`)
            }
        },

        selectCart: async(username,productId) => {
            try{
                const data = await knex.raw(`CALL selectCart(?,?);`,[username,productId]);
                return data[0][0][0];
            }
            catch(error){
                console.error(error)
                throw new RepositoryError(`SELECT Cart of User:${username} ProductId:${productId} Failed | ${error.sqlMessage}`)
            }
            
        },
        
        insertCart: async (newCart) =>  {

            try{
                return await knex.raw(`CALL insertCart(?,?,?,?,?,?,?,?)`,
                [newCart.username,newCart.productId,newCart.sellerUsername,newCart.title,
                newCart.imgUrl,newCart.price,newCart.stock,newCart.quantity]);
            }
            catch(error){
                console.error(error)
                throw new RepositoryError(`Insert Cart User:${username} ProductId:${productId} Failed | ${error.sqlMessage}`)
            }
            
        },

        deleteCart: async (username,productId) => {
            try{
                return await knex.raw(`CALL deleteCart(?,?);`,[username,productId]);
            }
            catch(error){
                console.error(error)
                throw new RepositoryError(`Delete Cart of User:${username} ProductId:${productId} Failed | ${error.sqlMessage}`)
            }
        },

        updateCart: async(username,productId,quantity) => {
            try{
                return await knex.raw(`CALL updateCart(?,?,?)`,[username,productId,quantity]);
            }
            catch(error){
                console.error(error)
                throw new RepositoryError(`Update Cart of User:${username} ProductId:${productId} Failed | ${error.sqlMessage}`)
            }
        },

        updateCartOnCheckout: async(productId,stock,quantity) => {
            try{
                return await knex.raw(`CALL updateCartOnCheckout(?,?,?)`,[productId,stock,quantity]);
            } catch(error){
                console.error(error)
                throw new RepositoryError(`Update Cart on Checkout of ProductId:${productId} Failed | ${error.sqlMessage}`)
            }
        },

        updateCartOnProductUpdate: async(updatedCart) => {
            try{
                return await knex.raw(`CALL updateCartOnProductUpdate(?,?,?,?,?)`,[updatedCart.productId,
                updatedCart.title,updatedCart.imgUrl,updatedCart.price,updatedCart.stock]);
            } catch(error) {
                console.error(error)
                throw new RepositoryError(`Update Cart on Product Update ProductId:${updatedCart.productId} Failed | ${error.sqlMessage}`)
            }
        }

    }


    return repository
}

module.exports = cartRepository