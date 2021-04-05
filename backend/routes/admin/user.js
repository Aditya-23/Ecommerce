const router = require('express').Router();
const {signup, signin, signout} = require("../../controller/admin/user");
const {requireSignin} = require("../../common-middleware/index");

// test case
// {
// 	"firstname" : "Aditya",
// 	"lastname" : "mysore",
// 	"email" : "adtyamysore002@gmail.com",
// 	"password" : "aditya",
// 	"username" : "aditya002",
// 	"phone" : "9588693316"
// }

// {
//     "email" : "adtyamysore002@gmail.com",
//     "password" : "aditya"
// }

router.post("/signup", signup);

router.post("/signin", signin);

router.get("/signout", requireSignin, signout);



module.exports = router;