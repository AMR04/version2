var express = require('express')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var fs = require('fs')
var route = express.Router()
var User= require('../model/userModel')
var dev= require('../model/deviceModel')
var saltRounds = 10

route.post("/signup", async (req, res) => {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password,
     // rpass:req.body.password,
      email: req.body.email
    });
  
    await User.findOne({ email: newUser.email })
      .then(async profile => {
        if (!profile) {
     
          bcrypt.hash(newUser.password, saltRounds, async (err, hash) => {
            if (err) {
              console.log("Error is", err.message);
            } else {
              
              newUser.password = hash;
              await newUser
                .save()
                .then(() => {
                  res.send({status: "200", data : newUser._id});
                })
                .catch(err => {
                  console.log("Error is ", err.message);
                });}
        
            }
          );}
         
         else {
          res.send("User already exists...");
        }
      })
      .catch(err => {
        console.log("Error is", err.message);
      });
  });


  route.post("/login", async (req, res) => {
    var newUser = {};
    newUser.email= req.body.email;
    newUser.password = req.body.password;
  
    await User.findOne({ email: newUser.email })
      .then(profile => {
        if (!profile) {
          res.send({status: "205",message:"User not existes"});
        } else {
          bcrypt.compare(
            newUser.password,
            profile.password,
            async (err, result) => {
                console.log(result)
              if (err) {
                console.log("Error is", err.message);
              } else if (result == true) {
                res.send({status: "200", message:"User authenticated" , id : profile._id , name : profile.username  });
              } else {
               res.send({status: "404", message:"User Unauthorized Access"});
              }
            }
          );
        }
      })
      .catch(err => {
        console.log("Error is ", err.message);
      });
  });



  route.get("/list", (req, res, next) => {
    User.find()
       .populate('device')
       .exec()
       .then(docs => {
         res.status(200).json({
            lengt: docs.length,
           data: docs
         });
       })
       .catch(err => {
         res.status(500).json({
           error: err
         });
       });
   });

route.put('/userconfig/:id', function (req,res,next) {
  User.findByIdAndUpdate({_id: req.params.id} ,
    
    {
      $set: {
      username: req.body.username,
      email: req.body.email,
      country: req.body.country,
      phone:req.body.phone
     } ,


       
  } , function (err) {
        if (err)
            next(err)
        else {
            res.json({status: "200", message: " updated" }) ;
         
        }
    }
)
})
route.get('/userinfo/:id', function (req, res, next) {
  var listuser = []
  User.findById(req.params.id).exec(function (err,infos) {
    if (err){
    res.json({status: "404"})} 
    else{     listuser.push({
           //   _id: infos._id,
                username: infos.username,
                email: infos.email,
                country: infos.country,
                phone: infos.phone,
   
    })
        res.json({status: "200", message: "user information", data:listuser})}    
})
})

route.get("/getdev/:id", (req, res, next) => {
  User.findById({_id : req.params.id})
    .populate('device')
    .exec()
    .then(order => {
      if (!order) {
        return res.status(404).json({
          message: "Order not found"
        });
      }
      res.status(200).json({
        order: order.device
        
    
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
route.put('/udev/:id', function (req,res,next) {
  User.findByIdAndUpdate({_id: req.params.id} ,
    
    {
      $set: {
      device:  [req.body.devices ],
      } ,


       
  } , function (err) {
        if (err)
            next(err)
        else {
            res.json({status: "OKK", message: "User informaton updated" }) ;
         
        }
    }
)
})


route.get("/listnumber", (req, res, next) => {

  User.find()
     .exec()
     .then(docs => {
       res.status(200).json({
       lengt: docs.length })})
       .catch(err => {
         res.status(500).json({
           error: err
         });
       })})



module.exports = route



/*$push: {    
      username: req.body.username,
      //email: req.body.email,
      height: req.body.height,
      weight: req.body.weight,
       age: req.body.age,}*/












