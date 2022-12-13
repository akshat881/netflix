const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/akshat',()=>{
    console.log('db done');
})