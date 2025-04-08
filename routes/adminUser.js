const express=require("express");
const router = express.Router();
const {handleGetAllusers, handleUserLogin,handlegetInstaInfluencer,handlesetInfluencer,handlegetAllInfluencer} = require('../controllers/adminUser')
const multer = require("multer");

router.get("/allUsers", handleGetAllusers)
router.post("/signin", handleUserLogin)
router.get("/instagram/:username",handlegetInstaInfluencer)
const storage=multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("image/")) {
            return cb(new Error("Only image files are allowed!"), false);
        }
        cb(null, true);
    },
});
router.post("/influencerForm",upload.single("Photo"),handlesetInfluencer)
router.get("/allInfluencer",handlegetAllInfluencer)

module.exports=router;