const express=require("express");
const router = express.Router();
const {handleGetAllusers,handleUserSignup, handleUserLogin,getSpecificUser,handleGetAllInfluencers,getProfilePhotoUrl,updateUserinfo} = require('../controllers/user')
require('dotenv').config();
const SECRET_KEY =process.env.SECRET_KEY
const {authenticateUser} = require('../auth')
const multer = require("multer");
const storage=multer.memoryStorage();

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("image/")) {
            return cb(new Error("Only image files are allowed!"), false);
        }
        cb(null, true);
    },
});

router.get("/", handleGetAllusers)

router.get("/influencers",handleGetAllInfluencers)

router.post("/signup",upload.single("Photo"),handleUserSignup)

router.post("/login", handleUserLogin)

router.get("/specUser",authenticateUser,getSpecificUser)

router.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
});

router.get("/profilePhoto",getProfilePhotoUrl)

router.put("/updateUser",updateUserinfo)

module.exports=router;