const jwt = require("jsonwebtoken");

const requireSignin = (req, res, next) => {
    let auth_token = req.headers.authorization;
    let user = jwt.verify(auth_token, process.env.JWT_SECRET_KEY);
    req.user = user
    next();
};

const authorizedAdmin = (req, res, next) => {
    if(req.user.role != "Admin"){
        return res.status(400).json({msg : "Only admins are allowed to access this site."})
    }
    next();
};

const authorizedUser = (req, res, next) => {
    if(req.user.role != "User"){
        return res.status(400).json({msg : "Access denied to the user"})
    }
    next();
};

module.exports = {
    requireSignin : requireSignin,
    authorizedAdmin : authorizedAdmin,
    authorizedUser : authorizedUser
}