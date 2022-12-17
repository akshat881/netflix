// const mongoose=require('mongoose');
// mongoose.connect('mongodb+srv://kito45:TMwehSg4AM3dCtw8@cluster0.azvhtvi.mongodb.net/kito?retryWrites=true&w=majority',
// ()=>{
//     console.log('db done');
// })
const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://m001-student:YlRcUDSTNeEIm55m@cluster0.azvhtvi.mongodb.net/?retryWrites=true&w=majority",
{  
}).then(()=>{
    console.log("connection done");
}).catch((e)=>{
    console.log(e);
})