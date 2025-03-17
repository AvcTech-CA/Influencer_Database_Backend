const express=require("express");
const router = express.Router();
const {handleGetAllusers} = require('../controllers/user')


router.get("/", handleGetAllusers)


module.exports=router;