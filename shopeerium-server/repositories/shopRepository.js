const RepositoryError = require("../HttpCodes/RepositoryError");

const Redis = require("ioredis");
const redis = new Redis({
  port: 6379,
  host: "shopeerium_redis",
  password: "securepassword",
});

const shopRepository = function () {
  const repository = {
    selectShops: async () => {
      // Get all Shops
      try {
        return await redis.keys(`shops:*`);
      } catch (error) {
        console.error(error);
        throw new RepositoryError(`REDIS - Select all Shops Failed`);
      }
    },

    selectShop: async (sellerUsername) => {
      // Get a single shop
      try {
        return await redis.hgetall(`shops:${sellerUsername}`);
      } catch (error) {
        console.error(error);
        throw new RepositoryError(`Select Shops: ${sellerUsername} Failed`);
      }
    },

    insertShop: async (newShop) => {
      // Insert new shop
      try {
        return await redis.hset(`shops:${newShop.sellerUsername}`, newShop);
      } catch (error) {
        console.error(error);
        throw new RepositoryError(
          `Insert Shop of ${newShop.sellerUsername} Failed`
        );
      }
    },
  };

  return repository;
};

module.exports = shopRepository;
