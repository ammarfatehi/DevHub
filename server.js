const express = require('express'); // essentially import express
const mongoose = require('mongoose');

// essentially importing our files/ telling it where to look
const users = require('./routes/api/users'); 
const profile = require('./routes/api/profile'); 
const posts = require('./routes/api/posts'); 

const app = express();

//DB config
const db = require('./config/keys').mongoURI;   // getting the link to connect to db

//Connect to Mongodb
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))    // .then is if it connects successfully it lets me know on the console
    .catch(err => console.log(err))  // .catch catches errors so we know if we failed connection


app.get('/', (req, res) => res.send('Hello chief'));  

// Use Routes; pretty much setting where like websitename/api/users will go
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;  // the first part of || is for horouke and the second is port 5000

app.listen(port, () => console.log(`Server running on port ${port}`));  // use `` instead of '' bcecause i wanna put a variable in the string

