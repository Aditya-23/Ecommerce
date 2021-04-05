const mongoose = require("mongoose");
const Category = require("./category").categoryModel
const User = require("./user").User

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    }, 
    description : {
        type : String, 
        trim : true,
        required : true,
        max : 6000
    },
    price : {
        type : Number,
        required : true,
        min : 30
    },
    images : [
        {
            img : {
                type : String
            }
        }
    ],
    reviews : [
        {
            review : {
                type : String
            }
        }
    ],
    quantity : {
        type : Number
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category"
    },
    categoryName : {
        type : String
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    createdByName : {
        type : String
    },
},
{
    timestamps : true
});

const productModel = new mongoose.model("Product", productSchema);

module.exports = {
    Product : productModel
}