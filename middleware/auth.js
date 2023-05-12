const jwt = require("jsonwebtoken");
const { constants } = require("../constants");

const auth = async (req, res, next) => {
try {
    const token = req.header("x-auth-token");

    if(!token){
       return  res.status(constants.UNAUTHORIZED).json({message: "No auth token, access denied"});
    }

    const verified = jwt.verify(token, "passwordKey");
    if(!verified){
        return res.status(constants.UNAUTHORIZED).json({message: "Token verification failed, authorization denied"});
        
    }
    req.user = req.verified.id;
    req.token =token;
    next();
} catch (error) {
    res.status(constants.SERVER_ERROR).json({error: error.message});
}
};


module.exports = auth;