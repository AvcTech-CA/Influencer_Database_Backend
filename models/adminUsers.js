const {type} = require('express/lib/response');
const mongoose = require('mongoose');

const adminUserSchema= new mongoose.Schema({
  

    email:{
        type:String,
    },
  
    password:{
        type:String,
    }
})


const adminUser=mongoose.model("adminUser",adminUserSchema);
module.exports=adminUser;