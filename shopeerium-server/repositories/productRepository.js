const knex = require("./knex");
const RepositoryError = require("../HttpCodes/RepositoryError");

const Redis = require("ioredis");
const redis = new Redis({
  port: 6379,
  host: "shopeerium_redis",
  password: "securepassword",
});

const productRepository = function () {
  const repository = {
    // Object of List of DB Functions

    searchProducts: async (pattern) => {
      try {
        const data = await knex.raw(`CALL searchProducts(?);`, [pattern]);
        return data[0][0];
      } catch (error) {
        console.error(error);
        throw new RepositoryError(
          `Product Search Failed | ${error.sqlMessage} `
        );
      }
    },

    selectProducts: async () => {
      try {
        const data = await knex.raw(`CALL selectProducts();`);
        return data[0][0];
      } catch (error) {
        console.error(error);
        throw new RepositoryError(
          `SELECT all Products Failed | ${error.sqlMessage} `
        );
      }
    },

    selectProduct: async (productId) => {
      try {
        return await redis.hgetall(`products:${productId}`);
      } catch (error) {
        console.error(error);
        throw new RepositoryError(
          `SELECT Product: ${productId} Failed | ${error.sqlMessage}`
        );
      }
    },

    selectProductbySeller: async (sellerUsername) => {
      try {
        const data = await knex.raw(`CALL selectProductbySeller(?);`, [
          sellerUsername,
        ]);
        return data[0][0];
      } catch (error) {
        console.error(error);
        throw new RepositoryError(
          `SELECT Product by Seller: ${sellerUsername} Failed | ${error.sqlMessage}`
        );
      }
    },

    selectProductbyCategory: async (category) => {
      try {
        const data = await knex.raw(`CALL selectProductbyCategory(?);`, [
          category,
        ]);
        return data[0][0];
      } catch (error) {
        console.error(error);
        throw new RepositoryError(
          `SELECT Product by Category: ${category} Failed | ${error.sqlMessage}`
        );
      }
    },

    insertProduct: async (newProduct) => {
      try {
        const sqlTask = knex.raw(`CALL insertProduct(?,?,?,?,?,?,?,?,?);`, [
          newProduct.productId,
          newProduct.sellerUsername,
          newProduct.title,
          newProduct.imgUrl,
          newProduct.price,
          newProduct.stock,
          newProduct.amountSold,
          newProduct.categories,
          newProduct.description,
        ]);

        const redisTask = redis.hset(
          `products:${newProduct.productId}`,
          newProduct
        );

        const results = await Promise.all([sqlTask, redisTask]);
        return results[0];
      } catch (error) {
        console.error(error);
        throw new RepositoryError(
          `INSERT Product: ${newProduct.productId} Failed | ${error.sqlMessage}`
        );
      }
    },

    deleteProduct: async (productId) => {
      try {
        const sqlTask = knex.raw(`CALL deleteProduct(?);`, [productId]);
        const redisTask = redis.del(`products:${productId}`);

        const results = await Promise.all([sqlTask, redisTask]);
        return results[0];
      } catch (error) {
        console.error(error);
        throw new RepositoryError(
          `DELETE Product: ${productId} Failed | ${error.sqlMessage}`
        );
      }
    },

    updateProduct: async (product) => {
      try {
        const sqlTask = knex.raw(`CALL updateProduct(?,?,?,?,?,?,?,?);`, [
          product.productId,
          product.title,
          product.imgUrl,
          product.price,
          product.stock,
          product.amountSold,
          product.categories,
          product.description,
        ]);

        const redisTask = redis.hset(`products:${product.productId}`, product);

        const results = await Promise.all([sqlTask, redisTask]);
        return results[0];
      } catch (error) {
        console.error(error);
        throw new RepositoryError(
          `UPDATE Product: ${product.productId} Failed | ${error.sqlMessage}`
        );
      }
    },
  };

  return repository;
};

module.exports = productRepository;
