const express=require("express");
const router = express.Router();
const {handleGetAllusers,handleUserSignup, handleUserLogin,getSpecificUser} = require('../controllers/user')
require('dotenv').config();
const SECRET_KEY =process.env.SECRET_KEY
const {authenticateUser} = require('../auth')

router.get("/", handleGetAllusers)

router.post("/signup",handleUserSignup)

router.post("/login", handleUserLogin)

router.get("/specUser",authenticateUser,getSpecificUser)

router.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
});

module.exports=router;