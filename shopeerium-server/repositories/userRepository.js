const knex = require('./knex');
const RepositoryError = require('../HttpCodes/RepositoryError')

const Redis = require('ioredis');
const redis =  new Redis({
    port: 6379,
    host: 'shopeerium_redis',
    password: "Password097"
}); 

const userRepository = function(){
    const repository = {                // Object of List of DB Functions 

        verifyUser: async(username,password) => {
            try{

                const data = await knex.raw(`CALL verifyUser(?,?)`,[username,password])
                return data[0][0][0]        // ok packet -> data packet -> nested data 
                
            } catch (error) {
                console.error(error)
                throw new RepositoryError(`Verify User: ${username} for login Failed`)
            }
        }, 

        selectUsers: async () => {
            try{
                const data = await knex.raw(`CALL selectUsers();`);
                return data [0][0]
            } catch(error) {
                console.error(error)
                throw new RepositoryError('SELECT all Users Failed')
            }
        },

        selectUser: async(username) => {
            try{
                return await redis.hgetall(`users:${username}`);
         
            } catch(error){
                console.error(error)
                throw new RepositoryError(`SELECT User: ${username} Failed`)
            }
        },
        
        insertUser: async(newUser)=> {
            try {
                
                const sqlTask = knex.raw(`CALL insertUser(?,?,?,?,?,?,?,?)`,[newUser.username,newUser.firstName,
                newUser.lastName,newUser.number,newUser.role,newUser.email,newUser.password,newUser.imgUrl]);
                
                const redisTask = redis.hset(`users:${newUser.username}`,newUser);
                
                const results = await Promise.all([sqlTask,redisTask]);

                return results[0];
                

            } catch (error) {
                console.error(error)
                throw new RepositoryError(`Insert User: ${username} Failed`)
            }
        },

        deleteBuyer: async(username)=> {
            try{
                const sqlTask =  knex.raw(`CALL deleteBuyer(?)`,[username]);
                const redisTask =  redis.del(`users:${username}`);

                const results = await Promise.all([sqlTask,redisTask]);

                return results[0];
                

            } catch (error){    
                console.error(error)
                throw new RepositoryError(`Delete Buyer: ${username} Failed`)
            }
        },

        deleteSeller: async(username)=> {
            try{
                const sqlTask = knex.raw(`CALL deleteSeller(?)`,[username]);
                const redisTask = redis.del(`users:${username}`);              
            


                const results = await Promise.all([sqlTask,redisTask]);

                return results[0];
 
            } catch (error){    
                console.error(error)
                throw new RepositoryError(`Delete Seller: ${username} Failed`)
            }
        },

        updateUser: async(updateUser) => {

            try{
                const sqlTask =  knex.raw(`CALL updateUser(?,?,?,?,?,?,?)`,[updateUser.username,updateUser.firstName,
                updateUser.lastName,updateUser.number,updateUser.email,updateUser.password,updateUser.imgUrl]);
                const redisTask = redis.hset(`users:${updateUser.username}`,updateUser); 
                
                const results = await Promise.all(sqlTask,redisTask);
                return results[0];

            } catch (error){
                console.error(error)
                throw new RepositoryError(`Update User: ${username} Failed`)
            }
        }
    }


    return repository;
}

module.exports = userRepository;