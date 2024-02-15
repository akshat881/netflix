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
            var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: '',
                pass: ''
              }
            });
            transporter.use('compile', hbs({
              viewEngine:'express-handlebars',
              viewPath:path.join(__dirname,'views')
            }));

            var mailOptions = {
              from: 'KITO',
              to: `${req.body.email}`,
              subject: 'Account Registration',
              template:'email'
            };
            
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
                res.render('index',{err:"errr"})
              } else {
                console.log('Email sent: ' + info.response);
                
                 res.render('index',{succ:"suc"});
                
              }
            });
            // res.render('index',{succ:"suc"});
          }
        });


      }
      catch(error){
        // console.log(error)
          res.render('index',{err:"errr"})
      }
    })
app.get('/login',(req,res)=>{
  res.render('login');
})
app.post('/login',async(req,res)=>{
  try{
  const {email,pass}=req.body;
  const find=await sign.findOne({email:email});
  if(find.email==email && find.password== pass){
    res.render('acco')
  }

  }
  catch(e){
    console.log(e)
    res.render('login',{err:"errr"})
  }


})
app.listen(4000,()=>{
    console.log('done');
})
