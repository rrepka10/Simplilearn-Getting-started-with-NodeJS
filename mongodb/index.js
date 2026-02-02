// This demonstrates a simple REST API using mongodb.  This run on port 8080
// This uses the new, promise-based mongoose API.

// Sample express code from lms.simplilearn.com Getting-started-with-NodeJS
// https://lms.simplilearn.com/courses/4236/Getting-started-with-NodeJS/syllabus

// npm init - first time only
// npm install --save express
// npm install --save path
// npm install --save handlebars
// npm install --save express-handlebars
// npm install --save body-parser
// npm install --save @handlebars/allow-prototype-access
// npm install --save mongoose
// run using:  node ./index.js

// Install the Mongodb.com Compass Community edition as a service
// create a DB called: studentDB and with a collection name of: students

// Windows: C:\Program Files\MongoDB\Server\version_number\log

// Tests:
// localhost:8080 - displays the home page
// http://localhost:8080/student/list - displays the student list page, can create new, edit or delete records
//      Use the web page to add, edit, delete records

require("./models/db");
const studentController = require("./controllers/studentController");

const express = require('express');
const path = require('path');
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const bodyparser = require('body-parser');

const port = 8080;
var app = express();

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

// Put up the home page
app.get('/', (req, res) => {
    res.send(`
        <h2>Welcome to students database!!</h2>
        <h3>Click here to get access to the <b> <a href="/student/list">Database</a></b></h3>`);
});

// set up handlebars view engine
app.set('views', path.join(__dirname, '/views/'));

app.engine(
    'hbs', 
    exphbs.engine({
        handlebars: allowInsecurePrototypeAccess(handlebars),
        extname: 'hbs',
        defaultLayout: 'MainLayout',
        layoutDir: __dirname + '/views/layouts/',
    })
);

app.set('view engine', 'hbs');


// start the server
app.listen(port, () => console.log(`Server listening on port ${port}`));
app.use('/student', studentController);


