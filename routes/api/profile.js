// actual profile of the users

const express = require('express');
const router = express.Router();    // pretty much like request in python; handles our request to our app
const mongoose= require('mongoose');
const passport = require('passport');

// Load Validation
const validateProfileInput =require('../validation/profile');

// Load Profile Model
const Profile = require('../models/Profile');
// Load User Model
const User = require('../models/User');

/*
@route GET api/profile/test
@dscript Tests profile route
@access Public
*/
router.get('/test', (req, res) => res.json({msg: 'Profile Works'}));    // this goes to routes/api/profile/test

/*
@route GET api/profile
@dscript Get current users profile
@access Private
*/
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {

    // Initialize errors object
    const errors = {};

    Profile.findOne({user: req.user.id})
        .populate('user', ['name', 'avatar']) // since our profile model is connected to our user model we can get info from our user model 
        
        .then(profile => {
            if(!profile) {
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));   // incase something goes wrong with finding the id in DB
});

/*
@route POST api/profile
@dscript Create or Edit current users profile
@access Private
*/
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {

    // Setting up the errors
    const {errors, isValid} = validateProfileInput(req.body);

    // Check Validation
    if(!isValid) {
        // return any errors with 400 Status
        return res.status(400).json(errors);
    }

    // Get all the fields they are in req.body
    const profileFields = {};
    profileFields.user = req.user.id;   // get all the basic user info
    
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.company) profileFields.company = req.body.company;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.bio) profileFields.bio = req.body.bio;
    if(req.body.status) profileFields.status = req.body.status;
    if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;

    // Skills - Split into an array since in the DB its a comma seperated string
    if(typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',');
    }

    // Social - its own object so we have to intialize a new object in profileFields
    profileFields.social = {};
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram;

    // sendding all the info and deciding whether this is an update or new profile
    Profile.findOne({user: req.user.id})
        .then( profile => {

            if(profile) {
                // Update
                // mongoose function findBIDAndUpdate: (who to update, what to update and the new info )
                Profile.findOneAndUpdate(
                    {user: req.user.id}, 
                    {$set: profileFields}, // set profileFields for this user in the DB to updated profileFeilds
                    {new: true}
                ).then(profile => res.json(profile));

            } else {
                // Create

                // first check to see if handle exists
                Profile.findOne({ handle: profileFields.handle})
                    .then(profile => {
                        if(profile) {
                            errors.handle = 'That handle already exists';
                            res.status(400).json(errors);
                        }

                        // Save Profile
                        new Profile(profileFields).save().then(profile => res.json(profile));
                    })
            }

        })

    }
);

/*
@route GET api/profile/all
@dscript Get all profiles
@access Public
*/
router.get('/all', (req,res) => {
    errors = {};
    Profile.find()
        .populate('user',['name','avatar'])
        .then(profiles => {
            if(!profiles) {
                errors.noprofile = 'There are no profiles';
                return res.status(404).json(errors);
            }

            res.json(profiles);
        })
        .catch(err => res.status(404).json({profile: 'There are no profiles'}));
});

/*
@route GET api/profile/handle/:handle
@dscript Get profile by handle
@access Public
*/
router.get('/handle/:handle', (req, res) => {
    const errors = {};
    Profile.findOne({handle: req.params.handle})    // get the handle from the url
        .populate('user', ['name', 'avatar'])
        .then( profile => {

            if(!profile) {
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            }

            res.json(profile);

        })
        .catch(err => res.status(404).json(err));
} );

/*
@route GET api/profile/user/:user_id
@dscript Get profile by user ID
@access Public
*/
router.get('/user/:user_id', (req, res) => {
    const errors = {};
    Profile.findOne({user: req.params.user_id})    // get the handle from the url
        .populate('user', ['name', 'avatar'])
        .then( profile => {

            if(!profile) {
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            }

            res.json(profile);

        })
        .catch(err => res.status(404).json({profile: 'There is no profile for this user_id'}));
} );

// you have to export the router for the server.js file to pick it up
module.exports = router;
