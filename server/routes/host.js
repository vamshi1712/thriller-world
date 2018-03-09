var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var Host = require('../models/host');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
 



// user registration
router.post('/signup', function (req, res, next) {
    var host = new Host({
        fullname: req.body.fullname,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
        phone: req.body.phone,
        location: req.body.location,
        pincode: req.body.pincode,
        isUser: req.body.isUser,
        isHost: req.body.isHost
    });

// save user to db
    host.save((err) => {
        // Check if error occured
        if (err) {
          // Check if error is an error indicating duplicate account
          if (err.code === 11000) {
            res.status(401).json({ success: false, message: 'Username or e-mail already exists' }); // Return error
          } 
          else {
            var token = jwt.sign({host: host}, 'secret', {expiresIn: 7200});
                              res.status(200).json({
                                  success:true,
                                  message: 'Successfully logged in',
                                  token: token,
                                  hostId: host._id
                          }); // Return success
        }
        } 
        
      });


  

        });



// user Login

router.post('/login', (req, res) => {
    // Check if username was provided
    if (!req.body.email) {
      res.status(401).json({ success: false, message: 'No email was provided' }); // Return error
    } else {
      // Check if password was provided
      if (!req.body.password) {
        res.status(401).json({ success: false, message: 'No password was provided.' }); // Return error
      } else {
        // Check if username exists in database
        Host.findOne({ email: req.body.email }, (err, host) => {
          // Check if error was found
          if (err) {
            res.status(500).json({ success: false, message: 'Invalid Credentials' }); // Return error
          } 
          if (!host) {
            res.json({ success: false, message: 'user not found.' }); // Return error
          }


          else {
            
              const validPassword = bcrypt.compareSync(req.body.password, host.password); // Compare password provided to password in database
              // Check if password is a match
              if (!validPassword) {
                res.status(401).json({ success: false, message: 'Password invalid' }); // Return error
              }
               else {
                var token = jwt.sign({host: host}, 'secret', {expiresIn: 7200});
                res.status(200).json({
                    success: true,
                    message: 'Successfully logged in',
                    token: token,
                    hostId: host._id
            });  // Return success and token to frontend
              }
            }

        });
      }
    }
  });






module.exports = router;
