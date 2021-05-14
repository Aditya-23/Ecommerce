const Product = require("../../models/product").Product
const Category = require("../../models/category").categoryModel

const findCategoryById = async (categoryId) => {
    // console.log("category id : ", categoryId)
    var category = await Category.findOne({_id : categoryId}, {name : 1});
    // console.log("category : ", category)
    return category.name
}

const addProduct = async (req, res, next) => {
    var categoryName = await Category.findOne({_id : req.body.category}, {name : 1})
    console.log("category name : ", categoryName['name']);
    console.log("created by : ", req.user.userEmail);
    const newProduct = {
        name : req.body.name,
        price : req.body.price,
        description : req.body.description,
        quantity : req.body.quantity,
        createdBy : req.user.id,
        category : req.body.category,
        createdByName : req.user.userEmail,
        categoryName : categoryName["name"],
    }
    newProduct.images = []
    req.files.forEach(file => {
        newProduct.images.push({img : file.filename})
    });
    const newProductObj = new Product(newProduct);
    
    try {
        await newProductObj.save();
        console.log(newProductObj)
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg : "Some error occurred while creating product.."})
    }
    console.log("adding product")
    return res.status(201).json({msg : "Product created successfully!"})
}

const getProducts = async (req, res, next) => {
    var allProducts;
    try {
        allProducts = await Product.find();
    } catch (error) {
        console.log("Some error while fetching the products")
        return res.status(400).json({ok : false, msg: "Some error while fetching the products"})
    }
    return res.status(201).json({ok : true, products : allProducts, msg : "Successfully fetched all the prodcuts"});
}

module.exports = {
    addProduct,
    getProducts,
}