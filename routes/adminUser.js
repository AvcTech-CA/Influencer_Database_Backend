const express=require("express");
const router = express.Router();
const {handleGetAllusers, handleUserLogin,handlegetInstaInfluencer,handlesetInfluencer,handlegetAllInfluencer,handlAdminSignup,
  handleGetengagementrate,handleGetfollowerSize,handleGetfiltercost} = require('../controllers/adminUser')
const multer = require("multer");

router.get("/allUsers", handleGetAllusers)
router.post("/signin", handleUserLogin)
router.get("/instagram/:username",handlegetInstaInfluencer)
router.post("/signUp",handlAdminSignup)
router.get("/engagementRates",handleGetengagementrate)
router.get("/followersizes",handleGetfollowerSize)
router.get("/filtercosts",handleGetfiltercost)
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    console.log("fileFilter function called")
    console.log("This is file",file)
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, PNG and JPG are allowed."), false);
  }
};

const upload = multer({ storage, fileFilter });
const uploadMiddleware = (req, res, next) => {
  
    upload.single("Photo")(req, res, function (err) {
    console.log("middleware called")

      if (err) {
        console.error("Upload error:", err.message);
        return res.status(400).json({ error: true, message: err.message });
      }
      next();
    });
  };
router.post("/influencerForm",uploadMiddleware,handlesetInfluencer)
router.get("/allInfluencer",handlegetAllInfluencer)

module.exports=router;