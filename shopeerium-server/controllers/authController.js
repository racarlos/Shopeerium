const ControllerError = require("../HttpCodes/ControllerError")
const jwt = require('jsonwebtoken');


const authController = function(userRepository){

    const controller = {

        login: async(req,res,next) => {
            try{
                const username = String(req.body.username);
                const password = String(req.body.password);
            
                console.log(`LOGIN username:${username} password: ${password}`);
        
        
                const validUser = await userRepository.verifyUser(username,password);
            
                if(!validUser){
                    return res.status(403).json({
                        message: 'Error! Username and Password Combination does not exist'
                    })
                }
            
                // Generate a signed json web token with the contents of the user object and  it in the response
                const accessToken = jwt.sign(JSON.parse(JSON.stringify(validUser)), process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});
            
                const refreshToken = jwt.sign(JSON.parse(JSON.stringify(validUser)), process.env.REFRESH_TOKEN_SECRET);
            
                return res.status(200).json({
                    username: username,
                    role: validUser.role,
                    accessToken: accessToken,
                    refreshToken: refreshToken
                }) 
        
            } catch(error){
                console.error(error)
                res.status(error.statusCode).json({
                    message: "Login Authentication Failed",
                    error: error
                })
            }
        }
    }

    return controller;
}

module.exports = authController;