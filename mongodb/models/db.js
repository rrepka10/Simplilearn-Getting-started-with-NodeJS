// Switched to use the cloud 

// data base instructions
const mongoose = require('mongoose');

//import dotenv from 'dotenv';
const dotenv = require('dotenv');

// Enable mongoose console logs 
//mongoose.set('debug', true); // prints model + operation + args

mongoose.set('debug', function (collectionName, method, query, doc, options) {
  //const ts = new Date().toISOString();
  
  //console.log(`[${ts}] Mongoose ${collectionName}.${method}`, {
    console.log(`Mongoose ${collectionName}.${method}`, {
	method,
    query,
    doc,
    options
  });
});


// Have the dotenv modules read our .env file data
dotenv.config();
console.log(`db account: ${process.env.DB_ADMIN} ${process.env.DB_PASSWORD}`);

console.log(`mongoose.connect(mongodb+srv: ${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@cluster0.fo8cyjt.mongodb.net/?appName=Cluster0`);


const connectToMongo = async() => {
	await mongoose.connect(`mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@cluster0.fo8cyjt.mongodb.net/?appName=Cluster0`);
};

/*
// Source - https://stackoverflow.com/a
// Posted by Aqeel
// Retrieved 2026-01-07, License - CC BY-SA 4.0
const connectToMongo = async () => {
  await mongoose.connect('mongodb://localhost:27017/StudentDB');
  console.log("Connected to mongodb://localhost:27017/StudentDB");
};
*/
connectToMongo();


//mongoose.connect('mongodb://localhost:27017/StudentDB', {
//    useNewUrlParser: true
//},
//err => {
//        if (!err) {
//            console.log('MongoDB connection to mongodb://localhost:27017/StudentDB.');
//        } else {
//            console.log('Error in DB connection: ' + err);
//        }
//    });

require('./student.model');

