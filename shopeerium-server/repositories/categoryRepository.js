const knex = require('./knex');
const RepositoryError = require('../HttpCodes/RepositoryError');

const cartRepository = function(){
    const repository = {                            // Object of List of DB Functions 
        
        selectCategories: async() => {
            try {
                return await knex.raw(`CALL selectCategories();`)
            } catch (error) {
                console.error(error)
                throw new RepositoryError(`SELECT all Categories Failed | ${error.sqlMessage}`)
            }
        },

        selectProductCategory: async(productId,category) => {
            try {
                return await knex.raw(`CALL selectProductCategory(?,?);`,[productId,category])
            } catch (error) {
                console.error(error)
                throw new RepositoryError(`SELECT Categories of Product: ${productId} Failed | ${error.sqlMessage}`)
            }
        },

        selectProductCategories: async(productId) => {
            try {
                return await knex.raw(`CALL selectProductCategories(?);`,[productId])
            } catch (error) {
                console.error(error)
                throw new RepositoryError(`SELECT Categories of Product: ${productId} Failed | ${error.sqlMessage}`)
            }
        },

        insertProductCategory: async(productId,category) => {
            try {
                return await knex.raw(`CALL insertProductCategory(?,?);`,[productId,category])
            } catch (error) {
                console.error(error)
                throw new RepositoryError(`INSERT Category: ${category} of Product: ${productId} Failed | ${error.sqlMessage}`)
            }
        },

        deleteProductCategory: async(productId,category) => {
            try {
                return await knex.raw(`CALL deleteProductCategory(?,?);`,[productId,category])
            } catch (error) {
                console.error(error)
                throw new RepositoryError(`DELETE Category: ${category} of Product: ${productId} Failed | ${error.sqlMessage}`)
            }
        }


    }
    return repository
}

module.exports = cartRepository