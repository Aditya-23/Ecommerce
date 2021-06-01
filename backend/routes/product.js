const router = require('express').Router();
const {requireSignin, authorizedUser} = require("../common-middleware/index")
const {getProductsByCategory} = require("../controller/product");


router.get("/get-products-by-category/:slug", requireSignin, authorizedUser, getProductsByCategory);

module.exports = router;