// This demonstrates how to create and verify JWT 
// //tokens using Express.js and the jsonwebtoken library.

// Sample express code from lms.simplilearn.com Getting-started-with-NodeJS
// https://lms.simplilearn.com/courses/4236/Getting-started-with-NodeJS/syllabus

// npm init - first time only
// npm install --save express
// npm install --save jsonwebtoken
// run using:  node ./index.js

// Gives web access
const express = require('express');
// Gives JWT functions
const jwt = require('jsonwebtoken');

const port = 8080;
const app = express();

// Generic entry point for the API
// postman localhost:8080/api
app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the JWT API',
    });
});


// the JWT protected route
// postman post localhost:8080/api/posts  headers -> authorization
// paste "Bearer" and the token, no quotes
app.post('/api/posts', verifyToken, (req, res) => {
    // Verify the token
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            // Bad token
            res.sendStatus(403);
        }
        else {
            // Good token
            res.json({ 
                message: 'Post created...',
                authData
            });
        }
    });
});


// login and generate a token
// postman post localhost:8080/api/login
// returns the security token, copy the data between the quotes
app.post('/api/login', (req, res) => {
    // get the data from the post
    const user = { 
        id: 1,
        username: 'John',
        email: 'john@gmail.com' 
    }

    // Get a JWT token
    jwt.sign({user: user}, 'secretkey', (err, token) => {
        res.json({
            token
        });
    });
});


// verify token
function verifyToken(req, res, next) {
    // get the auth header value
    const bearerHeader = req.headers['authorization'];

    // check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // good, split at the space
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        next();
    }
    else {
        // bad, Error 403 Forbidden
        res.sendStatus(403);
    }
}


// start the server
app.listen(port, () => console.log(`Server listening on port ${port}`));

