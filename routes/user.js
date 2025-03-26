const express=require("express");
const router = express.Router();
const {handleGetAllusers,handleUserSignup, handleUserLogin} = require('../controllers/user')


router.get("/", handleGetAllusers)

router.post("/signup",handleUserSignup)

router.post("/login", handleUserLogin)

module.exports=router;