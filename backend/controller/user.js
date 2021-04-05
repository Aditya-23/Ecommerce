const router = require('express').Router();
const User = require("../models/user").User;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signup = async (req, res, next) => {
    prevUser = await User.findOne({email : req.body.email});
    if(prevUser){
        return res.status(400).json({msg:"User already registered!"})
    }
    try {
        const hash_password = bcrypt.hashSync(req.body.password, 5);
        const newUser = new User({
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            phone : req.body.phone,
            email : req.body.email,
            username : req.body.username,
            hash_password : hash_password,
            role : "User"
        });
        await newUser.save();
    } catch (error) {
        console.log(error);
        return res.status(400).json({ok: false, msg:"Could not register the user!"});
    }
    return res.status(200).json({ok :true, msg:"User created successfully!"});
}

const signin = async (req, res, next) => {
    const user = await User.findOne({email : req.body.email});
    if(!user){
        return res.status(400).json({ok : false, msg:"Incorrect email"});
    }
    const comparedResult = bcrypt.compareSync(req.body.password, user.hash_password);
    if(comparedResult){
        const jwt_token = jwt.sign({id: user._id.toString(), data:user.email, role:user.role}, process.env.JWT_SECRET_KEY, {expiresIn : "30m"});
        return res.status(201).json({ok: true, token : jwt_token, msg:"User successfulyl logged in!", user: user});
    }
    else{
        return res.status(400).json("Incorrect password!");
    }
};


module.exports = {
    signup : signup,
    signin : signin,
}