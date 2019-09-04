const express = require('express');
const db = require('../data/db');

const router = express.Router();

//Get requests//
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
//Get requests//
//Post requests//
router.post(`/api/posts`, (req, res) => {
    const title = req.params.title; //required
    const contents = req.params.contents; //required
    const createdAt = req.params.created_at;
    const updatedAt = req.params.updated_at;

    //Checks to see if title or contents exist
    if(!title || !contents){
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
    else{
        db.insert(req.body)
            .then(post => {
                res.status(201).json({post})
            })
            .catch(err => {
                res.status(500).json({err : "Could not insert post. Check post structure & try again."})
            })
    }
})
router.post('/api/posts/:id/comments', (req, res) => {
    const postId = req.params.id;
    const comment = req.body
    comment.post_id = postId


    db.findById(postId) 
        .then(posts => {
            if(posts.length > 0) {
                if (comment.text) {
                    db.insertComment(comment) 
                        .then(result => {
                            db.findCommentById(result.id)
                                .then(result => {
                                    res.status(201).json(result)
                                })
                                .catch(err => {
                                    console.log(err) 
                                })
                        })
                        .catch(err => {
                            res.status(500).json({ error: "There was an error while saving the comment to the database" })
                        })
                } else {
                    res.status(400).json({ errorMessage: "Please provide text for the comment." })
                }
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." }) 
            }
        })

})
//Post requests//



module.exports = router;