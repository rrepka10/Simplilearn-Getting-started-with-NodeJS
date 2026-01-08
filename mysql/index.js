// This demonstrates a simple REST API using Express.js and MySQL database

// install xapp - a generic data base service
// https://www.apachefriends.org
// install in c:\xampp to avoid UAC deactivation on Windows
// open xapp control panel, start apache and mysql, when done, shut

// Sample express code from lms.simplilearn.com Getting-started-with-NodeJS
// https://lms.simplilearn.com/courses/4236/Getting-started-with-NodeJS/syllabus

// npm init - first time only
// npm install --save express
// npm install --save mysql
// run using:  node ./index.js

const express = require('express');
const mysql = require('mysql');
const port = 8080;


// Createte a connection to the database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'
});

// Connect to the database
db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
})

const app = express();

// create the database
// use localhost:8080/createdb the first time only
// check http://localhost/phpmyadmin/ for nodemysql
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, err => {
        if (err) {
            throw err;
        }
        res.send('Database created...');
    });
});


// Create table
// use localhost:8080/createemployee
// check http://localhost/phpmyadmin/ for the new table - id, name, designation
app.get('/createemployee', (req, res) => {
    let sql = 'CREATE TABLE employee(id int AUTO_INCREMENT, name VARCHAR(255), designation VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, err => {
        if (err) {
            throw err;
        }
        res.send('Employee table created...');
    });
});


// insert employee 1
// use localhost:8080/employee1
// check http://localhost/phpmyadmin/ browse for the employee 1
app.get('/employee1', (req, res) => {
    let post = {name: 'Jake Smith', designation: 'Chief Executive Officer'};
    let sql = 'INSERT INTO employee SET ?';
    let query = db.query(sql, post, err => {
        if (err) {
            throw err;
        }
        res.send('Employee 1 added...');
    });
});

// select an employee
// use localhost:8080/getemployee
app.get('/getemployee', (req, res) => {
    let sql = 'SELECT * FROM employee';
    let query = db.query(sql, (err, results) => {
        if (err) {
            throw err;
        }   
        console.log(results);
        res.send('Employee details fetched');
    });
});    


// update an employee with a given id number
// use localhost:8080/updateemployee/1
// check http://localhost/phpmyadmin/ browse for the employee 1, should be "Updated name"
app.get('/updateemployee/:id', (req, res) => {
    let newName = "Updated name";
    let sql = `UPDATE employee SET name = '${newName}' WHERE id = ${req.params.id}`; 
    let query = db.query(sql, err => {
        if (err) {
            throw err;
        }   
        res.send('Employee updated');
    });
});


// delete an employee with a given id number
// use localhost:8080/updateemployee/1
// check http://localhost/phpmyadmin/ employee 1 should be deleted
app.get('/deleteemployee/:id', (req, res) => {
    let newName = "Updated name";
    let sql = `DELETE FROM employee WHERE id = ${req.params.id}`; 
    let query = db.query(sql, err => {
        if (err) {
            throw err;
        }   
        res.send('Employee deleted');
    });
});


// start the server
app.listen(port, () => console.log(`Server listening on port ${port}`));
