const express=require("express");
const router = express.Router();
const {handleGetAllusers, handleUserLogin} = require('../controllers/adminUser')

router.get("/allUsers", handleGetAllusers)
router.post("/signin", handleUserLogin)

module.exports=router;