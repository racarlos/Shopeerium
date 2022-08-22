const jwt = require('jsonwebtoken');

// To be passed to every secured endpoint to verify who is accessing them 
exports.verifyToken = (req,res,next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]    // Get token which is the second element 

    if(token === 'null'){                                   // Token is null if there are no auth headers
        return res.status(401).json({
            message: 'Unauthorized Request! No Authorization Token Sent'
        })
    }

    // Verify if token is still valid 
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user) => {  
        if(err){
            return res.status(401).json({
                message: 'Token is not valid or has been tampered with.'
            })
        }

        // After token is verified, user is passed to req to determine which endpoints and 
        // Data are visible to the given user
        req.user = user;    
        next();
    })

}