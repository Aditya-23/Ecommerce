const Product = require("../models/product").Product
const Category = require("../models/category").categoryModel


const getProductsByCategory = async (req, res, next) => {
    console.log("Get products be category...")
    console.log("slug : ", req.params.slug)
    var allCategoryProducts;
    try {
        allCategoryProducts = await Product.find({categoryName:req.params.slug});
        
    } catch (error) {
        console.log("Some error while fetching the products")
        return res.status(400).json({ok : false, msg: "Some error while fetching the products"})
    }
    return res.status(201).json({ok : true, products : allCategoryProducts, msg : "Successfully fetched all the prodcuts"});
}

module.exports = {
    getProductsByCategory,
}