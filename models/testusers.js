const {type} = require('express/lib/response');
const mongoose = require('mongoose');

const testuserSchema= new mongoose.Schema({
    name:{
        type:String
    },

    email:{
        type:String
    },

    city:{
        type:String
    }
})


const testuser=mongoose.model("testuser",testuserSchema);
module.exports=testuser;