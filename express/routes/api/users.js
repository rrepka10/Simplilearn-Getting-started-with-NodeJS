const express = require('express');
const router = express.Router();
const uuid = require('uuid');
let users = require('../../Users');


// get all users
// postman get http://localhost:8080/api/users
router.get('/', (req, res) => {
    // return the list
    res.json(users);
});


// get users by id
// postman get http://localhost:8080/api/users/1
router.get('/:id', (req, res) => {
    // Search the list of users for this specific user
    const found = users.some(user => user.id === parseInt(req.params.id));
    if (found) {
        // Return the spcified user data
        res.json(users.filter(user => user.id === parseInt(req.params.id)));
    }
    else {
        // User not found
        res.status(400).json({ msg: 'ID not found' });
    }
});
   

// create a new user
// postman post http://localhost:8080/api/users/
// with json body -> raw json
//   { "name": "steph", "email": "steph@gmail.com"}
router.post('/', (req, res) => {
    // Define the post data structure type, randomally generate a new ID
    const newUser = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email
    };

    // Validate the data
    if (!newUser.name || !newUser.email) {
        return res.status(400).json({ msg: 'Please include a name and email' });
    }

    // There must be data, so add the new user to the list
    users.push(newUser);
    res.json(users);
});


// update user
// postman put http://localhost:8080/api/users/1
// with json body -> raw json
//   { "name": "John2", "email": "John2@gmail.com"}
router.put('/:id', (req, res) => {

    // Search the list of users for this specific user
    const found = users.some((user) => user.id === parseInt(req.params.id));

    if (found) {
        const updateUser = req.body

        // Loop through the users and update the matching user
        users.forEach((user) => {
            if (user.id === parseInt(req.params.id)) {
                user.name = updateUser.name ? updateUser.name : user.name;
                user.email = updateUser.email ? updateUser.email : user.email;
                res.json({ msg: 'User updated', user });
            }
        });
    }
    else {
        res.status(400).json({ msg: 'User not found' });
    }
  });
  
  
// Delete a user
// postman delete http://localhost:8080/api/users/1  
// body none
router.delete('/:id', (req, res) => {
    
    // Find the user to delete
    const found = users.some((user) => user.id === parseInt(req.params.id));

    if (found) {
       users = users.filter((user) => user.id !== parseInt(req.params.id));
       res.json({ msg: 'User deleted', users });
    }
    else {
        res.status(400).json({ msg: 'User not found' });
     //   res.sendStatus(400);
    }
});

  
module.exports = router;

