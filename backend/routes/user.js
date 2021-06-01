const router = require('express').Router();
const {signup, signin, signout} = require("../controller/user");
const {requireSignin} = require("../common-middleware/index");


// test case
// {
// 	"firstname" : "Bruce",
// 	"lastname" : "Wayne",
// 	"email" : "brucewayne@gmail.com",
// 	"password" : "Brucewayne@2",
// 	"username" : "bruce002",
// 	"phone" : "9588693316"
// }

// {
//     "email" : "brucewayne@gmail.com",
//     "password" : "Brucewayne@2"
// }
router.post("/signup", signup);

router.post("/signin", signin);

router.get("/signout", requireSignin, signout);



module.exports = router;