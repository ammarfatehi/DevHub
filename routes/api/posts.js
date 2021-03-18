//  all the posts for the feed

const express = require('express');
const router = express.Router();    // pretty much like request in python; handles our request to our app
const mongoose = require('mongoose');
const passport = require('passport');

// Post model
const Post = require('../models/Post');

// Validation
const validatePostInput = require('../validation/post');

/*
@route GET api/posts/test
@dscript Tests posts route
@access Public
*/
router.get('/test', (req, res) => res.json({msg: 'Posts Works'}));    // this goes to routes/api/users/test

/*
@route POST api/posts
@dscript Create a post
@access Private
*/
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {errors, isValid} = validatePostInput(req.body);

    // Check Validation
    if(!isValid) {
        // If any erros, send 400 with erros object
        return res.status(400).json(errors);
    }

    const newPost = new Post ({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });

    // Save
    newPost.save().then(post => res.json(post));
});

// you have to export the router for the server.js file to pick it up
module.exports = router;
