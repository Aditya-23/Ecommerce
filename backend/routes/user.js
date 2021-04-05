const router = require('express').Router();
const {signup, signin} = require("../controller/user");
const {requireSignin} = require("../common-middleware/index");


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
//     "email" : "brucewayne@gmail.com",
//     "password" : "bruce1"
// }
router.post("/signup", signup);

router.post("/signin", signin);


module.exports = router;