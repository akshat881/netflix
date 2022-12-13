const mongoose=require('mongoose');

const signup=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        // unique:[true,"Email id Alredy exixt"],
    },
    password:{
        type:String,
        required:true,
    }
})

module.exports=new mongoose.model('signup',signup)
