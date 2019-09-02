const express = require('express');
const checkAuth = require('../middleware/check-auth');
const fileExtract = require('../middleware/file');
const controller = require('../controller/post');

const router = express.Router();

//post a Post
router.post('', checkAuth, fileExtract, controller.createPost);

//Get all post
router.get('', controller.getPost)

//Delete a post
router.delete("/:id", checkAuth, controller.deletePost);


//updtae  particular post
router.put("/:id", checkAuth, fileExtract, controller.updatePost);


//get a particular post
router.get("/:id", controller.getOnePost)

module.exports = router;
