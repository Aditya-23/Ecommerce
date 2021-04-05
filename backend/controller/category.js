const Category = require("../models/category").categoryModel;
const slugify = require("slugify")

const addCategory = async (req, res, next) => {
    const newCategory = {
        name : req.body.name,
        slug : slugify(req.body.name),
        img : req.file.path,
    } 


    if(req.body.parentId){
        newCategory.parentId = req.body.parentId;
    }
    else{
        newCategory.parentId = null;
    }
    const newCategoryObj = new Category(newCategory);
    try {
        await newCategoryObj.save();
    } catch (error) {
        return res.status(400).json({msg : "Some error occurred.."})
    }
    
    return res.status(201).json("Succussfully created new category!");

};

function getAllCategories(allCategories, parentId = null) {
    const categoriesList = []
    var newCategoryList;
    if(parentId == null){
        newCategoryList = allCategories.filter(s => s.parentId == null);
    }
    else{
        newCategoryList = allCategories.filter(s => s.parentId == parentId);
    }
    newCategoryList.forEach(i => {
        categoriesList.push({
            id : i._id.toString(),
            name : i.name,
            slug : i.slug,
            parentId : i.parentId,
            children : getAllCategories(allCategories, i._id.toString())
        });  
    });
    return categoriesList;
}

const getCategories = (req, res, next) => {
    const allCategories = Category.find({}, (error, allCategories) => {
        if(error){
            return res.status(400).json({msg : "ERROR"})
        } 
        if(allCategories){
            const categories = getAllCategories(allCategories, null);   
            return res.status(200).json({categories : categories});
        }
    });

    
};

module.exports = {
    addCategory : addCategory,
    getCategories : getCategories
}