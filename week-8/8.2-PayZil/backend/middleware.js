const jwt = require("jsonwebtoken");
const { JWT_Secret } = require("./config");

function authMiddleware(req, res, next){
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            error : "Unauthorised request"
        });
    }
    const token = authHeader.split(" ")[1];
    
    try{
        const response = jwt.verify(token, JWT_Secret);
        req.userId = response.userId;
        next();
    }
    catch(err){
        return res.status(401).json({
            error : "Incorrect authorization."
        });
    }
}

module.exports = {
    authMiddleware
}