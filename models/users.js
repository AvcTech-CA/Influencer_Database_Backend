const {type} = require('express/lib/response');
const mongoose = require('mongoose');

const userSchema= new mongoose.Schema({
    firstName:{
        type:String
    },

    lastName:{
        type:String
    },

    email:{
        type:String,

        
    },
    companyName:{
        type:String
    },
    password:{
        type:String,
    

    },
    photo:{
        type:String
    }

})


const user=mongoose.model("user",userSchema);
module.exports=user;