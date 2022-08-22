const ControllerError = require('../HttpCodes/ControllerError')

const userController = function(userRepository,cartRepository,productRepository) {

    const controller = {

        // GET SELF
        getSelf: async(req,res) => {
            try {
                const user = req.user;

                console.log(user);

                res.status(200).json({                      
                    user: user
                });

            } catch (error) {
                console.error(error);
                return res.status(error.statusCode).json({                          
                    message: error.message,
                });
            }
        },

        // GET the list of all users
        getUsers: async (req,res) => {

            try{
                const users = await userRepository.selectUsers();   // returns array containing users
               
                if(users.length === 0){
                    throw new ControllerError(404,'Not Found! There are no Users in the Database.')
                } else {
                    res.status(200).json({                          // Send all users
                        users: users
                    });
                }
            } catch(error) {
                return res.status(error.statusCode).json({                          
                    message: error.message,
                });
            }
        },

        // GET a single user - REDIS
        getUser: async (req,res) => {
            const username = req.params.username;

            try{
                const validUser = await userRepository.selectUser(username)    // Check if user exists in the database 

                    
                if(validUser.username){
                    return res.status(200).json({                               // Send all users
                        user: validUser
                    });
                } else {
                    throw new ControllerError(404,`Not Found! User: ${username} does not exist in the database.`)
                }   
            } catch(error) {                                                    // If query failed, send error 
                return res.status(error.statusCode).json({                          
                    message: error.message,
                });
            }
        },

        // POST a user
        postUser: async (req,res) => {

            const newUser = {
                username: req.body.username,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                number: parseInt(req.body.number),
                role: req.body.role,
                email: req.body.email,
                password: req.body.password,
                imgUrl: req.body.imgUrl,
            };

            console.log(newUser);
            
            try {
                const validUser = await userRepository.selectUser(newUser.username)                                     // Check if user already exists in the database

    
                if(validUser.username){                                                                                 // If the username doesnt exist yet then create
                    throw new ControllerError(409,`Error! User ${newUser.username} already in the exists database.`)
    
                } else {                                                                                                // Throw Error if username already exists exists 
                    const [createUser] = await userRepository.insertUser(newUser);
                    return res.status(201).json({
                        message: `Success! User ${newUser.username} has been added to the database`,                
                    })
                }   
                
            } catch (error) {
                return res.status(error.statusCode).json({                          
                    message: error.message,
                })
            }
        },

        // DELETE a user 
        deleteUser: async(req, res) => {

            const username = req.params.username

            try{
                const validUser = await userRepository.selectUser(username)       // Check if user exists in the db

                if(validUser.username){

                    let status = false;

                    if(validUser.role === 'buyer'){                    
                        status = await userRepository.deleteBuyer(username).t

                    
                    } else if(validUser.role === 'seller'){ 
                        status = await userRepository.deleteSeller(username);
                    }


                    if(status){
                        return res.status(200).json({
                            message: `Success! User ${username} has been deleted from the database`,                
                        })        
                    }

                
                } else {
                    throw new ControllerError(404,`Error cannot Delete! User ${username} does not exist in the database.`)
                }
    

            } catch(error) {
                res.status(error.statusCode).json({
                    message: error.message
                })
            }
        },

        // UPDATE a user
        putUser: async (req,res) => {
            
            const userToUpdate = {
                username: req.body.username,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                number: parseInt(req.body.number),
                role: req.body.role,
                email: req.body.email,
                password: req.body.password,
                imgUrl: req.body.imgUrl,
            };

            try {
                
                const validUser = await userRepository.selectUser(userToUpdate.username) 
                if(!validUser.username){
                    throw new ControllerError(404,`Error! User with ${userToUpdate.username} does not exist in the database.`)
                }
    
                const [status] = await userRepository.updateUser(userToUpdate);

                return res.status(200).json({
                    message: `Success! User: ${username} has been updated!`,                
                });
    
            } catch (error) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }
        }
    }
    return controller;
}

module.exports = userController;