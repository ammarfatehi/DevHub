//  all the posts for the feed

const express = require('express');
const { profile_url } = require('gravatar');
const router = express.Router();    // pretty much like request in python; handles our request to our app
const mongoose = require('mongoose');
const passport = require('passport');

// Post model
const Post = require('../models/Post');
// Profile model
const Profile = require('../models/Profile');

// Validation
const validatePostInput = require('../validation/post');

/*
@route GET api/posts/test
@dscript Tests posts route
@access Public
*/
router.get('/test', (req, res) => res.json({msg: 'Posts Works'}));    // this goes to routes/api/users/test

/*
@route GET api/posts
@dscript Get all post
@access Public
*/
router.get('/', (req, res) => {
    Post.find()
        .sort({date: -1})
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({postsnotfound: 'No posts found'}));
});

/*
@route GET api/posts/:id
@dscript Get post by id
@access Public
*/
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({postnotfound: 'Post not found with that id'}));
});

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

/*
@route DELETE api/posts/:id
@dscript Delete a post
@access Private
*/
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id})
        .then(profile => {
            Post.findById(req.params.id)
                .then( post => {
                    // check for post owner bc only post owner can delete a post
                    if(post.user.toString() !== req.user.id) {  
                        // If not same user return error 401
                        return res.status(401).json({notauthorized: 'User not authorized'});
                    }

                    // Delete the post
                    post.remove().then(() => res.json({success: true}));
                })
                .catch(err => res.status(404).json({postnotfound: 'Post not found'}));
        });
});

// you have to export the router for the server.js file to pick it up
module.exports = router;
