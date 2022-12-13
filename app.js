const express =require('express');
const app=express();
const path=require('path')
require('./db/cones');

var hbs = require('nodemailer-express-handlebars');
const sign=require('./models/register');
app.set('view engine','hbs');
var nodemailer = require('nodemailer');
const Swal = require('sweetalert2')
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/',(req,res)=>{
    res.render('index'); 
    })
    app.post('/',async(req,res)=>{
      try{
        const {name,email,pass}=req.body;
        const sig=new sign({
          name:name,
          email:email,
          password:pass
        })
        const insert=sig.save(err=>{
          if(err){
            console.log("error")
            res.render('index',{err:"errr"})
          }
          else{
            res.render('index',{succ:"suc"});
          }
        });


      }
      catch(error){
        console.log(error)
          res.render('index',{err:"errr"})
      }
    })
app.get('/login',(req,res)=>{
  res.render('login');
})
app.listen(4000,()=>{
    console.log('done');
})