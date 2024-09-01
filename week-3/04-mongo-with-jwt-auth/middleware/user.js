const jwt = require("jsonwebtoken");
const { jwt_password } = require("../config");

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected

    const auth = req.headers.authorization;
    const words = auth.split(" ");
    const token = words[1];

    const response = jwt.verify(token, jwt_password);
    if(response.username){
        next();
    }
    else{
        res.status(403).json("Incorrect authorization.")
    }
}

module.exports = userMiddleware;