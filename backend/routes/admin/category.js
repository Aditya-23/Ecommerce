const router = require('express').Router();
const {requireSignin, authorizedAdmin, authorizedUser} = require("../../common-middleware/index");
const { addCategory, getCategories} = require("../../controller/category");
const multer = require("multer");

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, "backend/brands/")
    },
    filename : (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({storage : storage});


router.post("/add-category", requireSignin, authorizedAdmin, upload.single("image"), addCategory);

router.get("/get-categories", requireSignin, authorizedAdmin, getCategories);

module.exports = router;