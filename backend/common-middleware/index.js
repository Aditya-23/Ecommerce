const jwt = require("jsonwebtoken");

const requireSignin = (req, res, next) => {
    let auth_token = req.headers.authorization;
    let user = jwt.verify(auth_token, process.env.JWT_SECRET_KEY);
    req.user = user
    console.log("USER : ", req.user)
    console.log("user signed in ")
    next();
};

const authorizedAdmin = (req, res, next) => {
    if(req.user.role != "Admin"){
        console.log("admin not authorized")
        return res.status(400).json({msg : "Only admins are allowed to access this site."})
    }
    console.log("Admin authorized..")
    next();
};

const authorizedUser = (req, res, next) => {
    if(req.user.role != "User"){
        console.log("User not authorized")
        return res.status(400).json({msg : "Access denied to the user"})
    }
    console.log("User authorized..")
    next();
};

module.exports = {
    requireSignin : requireSignin,
    authorizedAdmin : authorizedAdmin,
    authorizedUser : authorizedUser
}