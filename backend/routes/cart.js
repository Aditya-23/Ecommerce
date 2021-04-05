const router = require('express').Router();
const {signup, signin} = require("../controller/user");
const {requireSignin, authorizedUser} = require("../common-middleware/index");
const { addToCart } = require('../controller/cart');

router.post("/add-to-cart", requireSignin, authorizedUser, addToCart);

module.exports = router;

// {
// 	"user" : "601ad74217c27414c0d81ab8",
// 	"item" : [
// 		{
// 			"product" : "601ad8c3e667341ec4d63f23",
// 			"quantity" : 2,
// 			"price" : 40000
// 		}
// 	]
// }

// {
// 	"user" : "601ad74217c27414c0d81ab8",
// 	"item" : {
// 		"product" : "60228b1dc2fe0c3c24267f0f",
// 		"quantity" : 3,
// 		"price" : 65900
// 	}
// }
