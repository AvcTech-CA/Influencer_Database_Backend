const {type} = require('express/lib/response');
const mongoose = require('mongoose');

const engagementRateSchema= new mongoose.Schema({
  

    rate:{
        type:String,
    },
  
})


const engagementRate=mongoose.model("engagementRate",engagementRateSchema);
module.exports=engagementRate;