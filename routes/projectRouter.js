const express = require("express");
require('dotenv').config()
const bcrypt = require('bcrypt');
const saltRounds = 10;
const ProjectModel = require('../models/project.js')
const LoginModel = require("../models/login.js")
const projectRouter = express.Router()
const routeGuard = require('../customDependances/authGuard')
const nodemailer = require("nodemailer")
const upload = require('../customDependances/multer')


const transporter = nodemailer.createTransport({        
   service: "Outlook365",
   auth: {
     user: process.env.USER_MAIL,
     pass: process.env.PASS_MAIL,
   },
   tls: {rejectUnauthorized: false}
})




projectRouter.get('/', async (req, res) => {
   try {
      let projects = await ProjectModel.find();
      res.render('main.twig', {
         projects: projects
      })
   } catch (err) {
      res.send(err);
   }
})

projectRouter.get('/addProject',routeGuard, async (req, res) => {
   try {
      let projects = await ProjectModel.find();
      res.render('addprojectform.twig',{
       projects: projects
      })
      
   } catch (err) {
      console.log(err);
      res.send(err);
   }
})

projectRouter.get('/connect', async (req, res) => {
   console.log("test");
   try {
      res.render('connect.twig')
   } catch (err) {
      console.log(err);
      res.send(err);
   }
})


projectRouter.post('/addproject',routeGuard, upload.single('image'), async (req, res) => {
   console.log(req.body);
   try {
      req.body.image = req.file.filename 
      let project = new ProjectModel(req.body)
      project.save()
      res.redirect('/')
   } catch (err) {
      console.log(err);
      res.send(err);
   }
})

projectRouter.post('/login', async (req, res) => {
   try {
      let login = await LoginModel.findOne({ login: req.body.login })
      if (login) {
         if (await bcrypt.compare(req.body.password, login.password)) {
            console.log(login._id);
            req.session.userId = login._id
            console.log(req.session.userId);
            
            res.redirect('/addProject')
         }else{
            res.redirect('/')
         }
         

      }else{
         res.redirect('/')
      }

   } catch (err) {
      console.log(err);
      res.send(err);
   }
})

projectRouter.post('/sendMail', async (req, res) =>{
   try{
      console.log(req.body);
      let info = await transporter.sendMail({
         from: process.env.USER_MAIL,
         to: process.env.MY_MAIL,
         subject: req.body.name,
         html: JSON.stringify(req.body),
      })
      res.redirect('/')
   }catch (err){
      console.log(err);
      res.send(err)
   }
})





module.exports = projectRouter


