// This handles all the student related routes using the promise-based mongoose API


const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Student = mongoose.model('Student');

router.get('/', (req, res) => {
    res.render('student/addOrEdit', {
        viewTitle: 'Insert Student'
    })
});

router.post('/', (req, res) => {
    if (req.body._id == '') {
        insertRecord(req, res);
    } else {
        updateRecord(req, res);
    }
});

function insertRecord(req, res) {
    var student = new Student();
    student.fullName = req.body.fullName;
    student.email = req.body.email;
    student.mobile = req.body.mobile;
    student.city = req.body.city;
    student.save({}) 
          .then(doc => {     
            res.redirect('student/list');
        })
          .catch(err => {
                console.log('Error during record insertion : ' + err);
    });
};
//function insertRecord(req, res) {
//    var student = new Student();
//    student.fullName = req.body.fullName;
//    student.email = req.body.email;
//    student.mobile = req.body.mobile;
//    student.city = req.body.city;
//    student.save((err, doc) => {
//        if (!err) {
//            res.redirect('student/list');
//        } else {
//            console.log('Error during record insertion : ' + err);
//        }
//   })
//};


function updateRecord(req, res) {
    Student.findOneAndUpdate(
        {_id: req.body._id}, 
        req.body, 
        {new: true}) 
        .then(doc => {
             res.redirect('student/list'); 
        })
        .catch(error => {
             console.log('Error during record update : ' + err);
        });
    };
//function updateRecord(req, res) {
//    Student.findOneAndUpdate(
//        {_id: req.body._id}, 
//        req.body, 
//        {new: true}, 
//        (err, doc) => {
//            if (!err) {
//             res.redirect('student/list'); 
//            } else {
//             console.log('Error during record update : ' + err);
//            }
//        }
//    );
//}


// This works to get the list of students
router.get('/list', function(req, res) {
    Student.find({})
        .then(foundItems => {
            res.render('student/list', {list: foundItems});
        })
        .catch(err => {
            console.log('Error in retrieving student list :' + err);
    });
});
//router.get('/list', (req, res) => {
//    Student.find((err, docs) => {
//        if (!err) {
//            res.render('student/list', {
//                list: docs
//            });
//        } else {
//            console.log('Error in retrieving student list :' + err);
//        }
//    });
//});


// Get a record using the MongoDB _id field
router.get('/:id', (req, res) => {
    Student.findById({_id: req.params.id})
    .then(doc => {
        res.render('student/addOrEdit', {
            viewTitle: 'Update Student', student: doc});
        console.log(doc);
        })   
      .catch(err => {
          console.log(err);
    });
});
//router.get('/:id', (req, res) => {
//    Student.findById(req.params.id, (err, doc) => {
//        if (!err) {
//            res.render('student/addOrEdit', {
//                viewTitle: 'Update Student',
//                student: doc
//            });
//            console.log(doc);
//        }
//    });
//});


// To delete a student record using the MongoDB _id field
router.get('/delete/:id', (req, res) => {
    Student.findByIdAndDelete({_id: req.params.id})
        .then(foundItems =>{
            res.redirect('/student/list');
        })
        .catch(err => {
            console.log('Error in student delete :' + err);
    });
});
//router.get('/delete/:id', (req, res) => {
//    Student.findByIdAndRemove(req.params.id, (err, doc) => {
//        if (!err) {
//            res.redirect('/student/list');
//        } else {
//            console.log('Error in student delete :' + err);
//        }
//    });
//});

module.exports = router;
