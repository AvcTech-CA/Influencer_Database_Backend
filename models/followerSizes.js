const {type} = require('express/lib/response');
const mongoose = require('mongoose');

const followerSizeSchema= new mongoose.Schema({
  

    type:{
        type:String,
    },
  
})


const followerSize=mongoose.model("followerSizes",followerSizeSchema);
module.exports=followerSize;