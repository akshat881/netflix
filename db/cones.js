const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://m001-student:TMwehSg4AM3dCtw8@cluster0.azvhtvi.mongodb.net/kito?retryWrites=true&w=majority',()=>{
    console.log('db done');
})