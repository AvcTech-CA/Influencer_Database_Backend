const express=require("express");
const router = express.Router();
const {handleGetAllusers,handleUserSignup} = require('../controllers/user')


router.get("/", handleGetAllusers)

router.post("/signup",handleUserSignup)

module.exports=router;