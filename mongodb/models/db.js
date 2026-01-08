// data base instructions
const mongoose = require('mongoose');

// Source - https://stackoverflow.com/a
// Posted by Aqeel
// Retrieved 2026-01-07, License - CC BY-SA 4.0

const connectToMongo = async () => {
  await mongoose.connect('mongodb://localhost:27017/StudentDB');
  console.log("Connected to MongoDB");
};

connectToMongo();


//mongoose.connect('mongodb://localhost:27017/StudentDB', {
//    useNewUrlParser: true
//},
//err => {
//        if (!err) {
//            console.log('MongoDB connection succeeded.');
//        } else {
//            console.log('Error in DB connection: ' + err);
//        }
//    });

require('./student.model');

