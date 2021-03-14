// handle authentication and creating an account

const express = require('express');
const router = express.Router();    // pretty much like request in python; handles our request to our app
const gravatar = require('gravatar');   // importing gravatar library
const bcrpt = require('bcryptjs');  // encrept the password

//load user model
const User = require('../models/User');

/*
@route GET api/users/test
@dscript Tests users route
@access Public
*/
router.get('/test', (req, res) => res.json({msg: 'Users Works'}));    // this goes to routes/api/users/test

/*
@route GET api/users/register
@dscript register a new user
@access Public
*/
router.post('/register', (req, res) =>{
    // req.body has all the data that you are sent from your requester
    //check if the email already exist
    User.findOne({email: req.body.email})
        .then(user =>{
            if(user){
                return res.status(400).json({email: 'Email already exists'});
            } else {

                // getting the gravatar profile pic associated with this email
                const avatar = gravatar.url(req.body.email,{
                    s: '200',    // size
                    r: 'pg',    // rating (like pg for parental guidance)
                    d: 'mm',    // default
                });

                // creating a new user using the userSchema and filling in their info
                const newUser = new User({  // you have to do new modelname and pass in data
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                }); 
                
                // encrpting the password 
                bcrpt.genSalt(10, (err, salt) =>{
                    bcrpt.hash(newUser.password, salt, (err, hash) => { // hash = encrpted password
                        if(err) throw err;
                        newUser.password = hash;

                        // saving this user to DB
                        newUser
                            .save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })
            }
        })
});


// you have to export the router for the server.js file to pick it up
module.exports = router;
