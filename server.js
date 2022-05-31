const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const User=require('./model/userModel')


const users = []
mongoose.connect('mongodb://localhost:27017/vikashDB',{ useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.on('error',(err) => {
  console.log(err);
});

db.once('open',() => {
  console.log("DataBase successFully Connected");
});
app.set('view-engine','ejs')
app.use(express.urlencoded({extended:false }))

app.get('/',(req,res)=>{
    res.render('index.ejs',{name:'vikash'})
})

app.get('/login',(req,res)=>{
    res.render('login.ejs')
})

app.post('/login',(req,res)=>{

})

app.get('/register',(req,res)=>{
    res.render('register.ejs')
})

app.post('/register', async (req,res)=>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const data={
            name: req.body.name,
            email:req.body.email,
            password:hashedPassword
        };
        console.log(data)
        const userDetails=new User(data)
        const result=await userDetails.save()
        console.log(result)
        res.redirect('/login')
    }catch {
        res.redirect('/register')

    }
    console.log(users);

})
app.listen(3000)