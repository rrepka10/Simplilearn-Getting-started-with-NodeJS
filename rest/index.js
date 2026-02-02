// This demonstrates a simple REST API using Express.js

// Sample express code from lms.simplilearn.com Getting-started-with-NodeJS
// https://lms.simplilearn.com/courses/4236/Getting-started-with-NodeJS/syllabus

// npm init - first time only
// npm install --save express
// run using:  node ./index.js

const express = require('express');
const app = express();
const port = 8080;

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// in-memory movie list
let movies = [
    {
    id: "1",
    title: "Inception",
    director: "Christopher Nolan",
    release_date: "2010-07-16"
    },
    {
    id: "2",
    title: "The Irishman",
    director: "Martin Scorsese",
    release_date: "2019-09-27"
    },
];

// get the movie list 
// postman get localhost:8080/movie
app.get('/movie', (req, res) => {
    // return the array of movies
    res.json(movies);
});

// add a movie to the list
// postman post localhost:8080/movie
// body raw json  { "id": "3", "title": "New movie", "director": "new director", "release_date": "2020-20-20" }
app.post('/movie', (req, res) => {
    // get the data from the post
    const movie = req.body;

    console.log('Movie received: ', movie);
    movies.push(movie);
    res.send('Movie added successfully');
});

// search the movie data base
// postman get localhost:8080/movie/2
app.get('/movie/:id', (req, res) => {
    // get the data from the post
    const id = req.params.id;

    // find the movie with the id
    for (let movie of movies) {
        if (movie.id === id) {
            res.json(movie);
            return;
        }
    }
    res.status(404).send('Movie not found');
});

// delete a record from the movie data base
// postman delete  localhost:8080/movie/2
app.delete('/movie/:id', (req, res) => {
    // get the data from the post
    const id = req.params.id;

    movies = movies.filter(movie => {
        if (movie.id !== id) {
            return true;
        }
        return false; 
    });

    res.send('Movie is deleted');
});


// start the server
app.listen(port, () => console.log(`Server listening on port ${port}`));

