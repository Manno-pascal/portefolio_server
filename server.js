const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const session = require('express-session');
const projectRouter = require('./routes/projectRouter.js')



const db = process.env.BDD_URL
const app = express()

app.use(express.static('./assets')); 
app.use(session({secret: process.env.SESSION_PWD,saveUninitialized: true,resave: true}));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(projectRouter)

app.listen(process.env.PORT,(err)=>{
    if (err) {
       console.log(err); 
    }else{
        console.log('Server started on port '+process.env.PORT);
    }
})

mongoose.set('strictQuery', false);
mongoose.connect(db,(err)=>{
    if (err) {
        console.log(err);
    }else{
        console.log("MongoDB connected");
    }
})













