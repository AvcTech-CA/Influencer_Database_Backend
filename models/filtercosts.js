const {type} = require('express/lib/response');
const mongoose = require('mongoose');

const filtercostSchema= new mongoose.Schema({
  

    cost:{
        type:String,
    },
  
})


const filtercost=mongoose.model("filtercost",filtercostSchema);
module.exports=filtercost;