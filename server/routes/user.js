var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
 
// // Connection URL
// const url = 'mongodb://localhost:27017/twdb';
 
// // Database Name
// const dbName = 'twdb';


// user registration
router.post('/signup', function (req, res, next) {
    var user = new User({
        fullname: req.body.fullname,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
        phone: req.body.phone,
        location: req.body.location,
        pincode: req.body.pincode,
        isMarried: req.body.isMarried,
        isUser: req.body.isUser,
        isHost: req.body.isHost
    });

// save user to db
    user.save((err) => {
        // Check if error occured
        if (err) {
          // Check if error is an error indicating duplicate account
          if (err.code === 11000) {
            res.status(401).json({ success: false, message: 'Username or e-mail already exists' }); // Return error
          } 
          else {
            var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
                              res.status(200).json({
                                  success:true,
                                  message: 'Successfully logged in',
                                  token: token,
                                  userId: user._id
                          }); // Return success
        }
        } 
        
      });


    // if(email){
    //     user.findOne({email: email}).then(function(result){
    //         if(result!=null){
    //         }
    //    });
    // }

    // if(req.body.email){
    //     MongoClient.connect(url, function(err, client) {
    //         assert.equal(null, err);
    //         if(err) throw err;
    //         const db = client.db(dbName);
    
    //         var query = { email : req.body.email };
            
    //         db.collection('users').find(query).toArray(function(err,result){
    //             if(err) throw err;
    //             console.log(result);
    //             res.status(201).json({
    //                 message: 'mail already exists'
    //             });
    //         });
    
    //     });
    // }
    
    //      else{
    //         db.collection('users').insertOne(user, function(err, results) {
    //             assert.equal(null, err);
    //             res.send(results);
    //               // db.close();
    //           });
    //            var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
    //                   res.status(200).json({
    //                       message: 'Successfully logged in',
    //                       token: token,
    //                       userId: user._id
    //               });
    //      }

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
        User.findOne({ email: req.body.email }, (err, user) => {
          // Check if error was found
          if (err) {
            res.status(500).json({ success: false, message: 'Invalid Credentials' }); // Return error
          } 
          if (!user) {
            res.status(401).json({ success: false,title: 'failed', message: 'user not found.' }); // Return error
          }


          else {
            
              const validPassword = bcrypt.compareSync(req.body.password, user.password); // Compare password provided to password in database
              // Check if password is a match
              if (!validPassword) {
                res.status(401).json({ success: false, message: 'Password invalid' }); // Return error
              }
               else {
                var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
                res.status(200).json({
                    success: true,
                    message: 'Successfully logged in',
                    token: token,
                    userId: user._id
            });  // Return success and token to frontend
              }
            }

        });
      }
    }
  });




// router.post('/login', function(req, res, next) {
//     User.findOne({email: req.body.email}, function(err, user) {
//         if (err) {
//             return res.status(500).json({
//                 title: 'An error occurred',
//                 error: err
//             });
//         }
//         if (!user) {
//             return res.status(401).json({
//                 title: 'Login failed',
//                 error: {message: 'Invalid login credentials'}
//             });
//         }
//         if (!bcrypt.compareSync(req.body.password, user.password)) {
//             return res.status(401).json({
//                 title: 'Login failed',
//                 error: {message: 'Invalid login credentials'}
//             });
//         }
//         var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
//         res.status(200).json({
//             message: 'Successfully logged in',
//             token: token,
//             userId: user._id
//         });
//     });
// });

module.exports = router;
