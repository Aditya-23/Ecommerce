const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        trim : true
    },
    slug : {
        type : String,
        required : true,
        unique : true
    },
    img : {
        type : String
    },
    parentId : {
        type : String
    }
},{
    timestamps: true,
});

const categoryModel = new mongoose.model("Category", categorySchema);

module.exports = {
    categoryModel : categoryModel,
}