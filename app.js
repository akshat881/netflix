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
      const sig=new sign({
        name:req.body.name,
        email:req.body.email,
        password:req.body.pass
    })
    const succc=await sig.save()
  
 console.log(succc)
         if(succc){
          
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'infocbs869@gmail.com',
                  pass: 'nqckcnvulorsbezu'
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
                } else {
                  console.log('Email sent: ' + info.response);
                  
                   res.render('index',{succ:"suc"});
                  // return res.json({succ:"suc"})
                }
              });
    
         }

   
    

    }
    catch(error)
    {
    
     
        // res.render('index',{err:"errr"})
        if(error.code===11000){
          res.render('index',{err:"errr"})
          // return res.json({err:"errr"})

        }
    }
  
})
app.post('/login',async(req,res)=>{
  try{
const dupli=await sign.findOne({email:req.body.mail})
if(dupli.email===req.body.mail && dupli.password===req.body.pass){
    res.render("acco");
}
  }
  catch(e){
console.log(e)
  res.render('index',{wron:"e"})

  }
  })
app.listen(4000,()=>{
    console.log('done');
})