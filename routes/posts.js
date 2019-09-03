// inside /users/userRoutes.js <- this can be place anywhere and called anything

const express = require('express');
const db = require('../data/db');

const router = express.Router(); // notice the Uppercase R

// this file will only be used when the route begins with "/users"
// so we can remove that from the URLs, so "/users" becomes simply "/"
router.get('/', (req, res) => {
  db.find()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({err  : "Posts could not be loaded."})
    })
});

router.get('/:id', (req, res) => {
    console.log(req.params.id);
    let id = req.params.id;
        db.findById(id)
            .then(post => {
                res.status(200).json(post)
            })
            .catch(err =>{
                res.status(500).json({err : "ID could not be found"})
            })
});

router.get('/:id/comments', (req, res) => {
    db.findPostComments()
        .then(comments => {
            res.status(200).json(comments)
        })
        .catch(err =>{
            res.status(500).json({err : "Could not load comments"})
        })
});

router.post('/', (req, res) => {
  res.status(200).send('hello from the POST /users endpoint');
});

// .. and any other endpoint related to the users resource

// after the route has been fully configured, then we export it so it can be required where needed
module.exports = router; // it is recommended that this be the last line on the file