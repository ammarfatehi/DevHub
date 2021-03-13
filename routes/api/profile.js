// actual profile of the users

const express = require('express');
const router = express.Router();    // pretty much like request in python; handles our request to our app

/*
@route GET api/profile/test
@dscript Tests profile route
@access Public
*/
router.get('/test', (req, res) => res.json({msg: 'Profile Works'}));    // this goes to routes/api/profile/test

// you have to export the router for the server.js file to pick it up
module.exports = router;
