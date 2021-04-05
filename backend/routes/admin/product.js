const router = require('express').Router();
const multer = require("multer");
const {requireSignin, authorizedAdmin, authorizedUser} = require("../../common-middleware/index");
const { addProduct, getProducts } = require('../../controller/admin/product');
const { addCategory, getCategories} = require("../../controller/category");

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, "backend/uploads/")
    },
    filename : (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({storage : storage});

router.post("/add-product", requireSignin, authorizedAdmin, upload.array("images"), addProduct);

router.get("/get-products", requireSignin, authorizedAdmin, getProducts);

module.exports = router;