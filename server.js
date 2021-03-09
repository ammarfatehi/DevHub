const express = require('express'); // essentially import express

const app = express();

app.get('/', (req, res) => res.send('Hello chief'));  

const port = process.env.PORT || 5000;  // the first part of || is for horouke and the second is port 5000

app.listen(port, () => console.log(`Server running on port ${port}`));  // use `` instead of '' bcecause i wanna put a variable in the string

