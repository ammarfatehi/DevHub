//  all the posts for the feed

const express = require('express');
const router = express.Router();    // pretty much like request in python; handles our request to our app

/*
@route GET api/posts/test
@dscript Tests posts route
@access Public
*/
router.get('/test', (req, res) => res.json({msg: 'Posts Works'}));    // this goes to routes/api/users/test

// you have to export the router for the server.js file to pick it up
module.exports = router;
