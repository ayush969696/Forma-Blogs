const express = require('express');
const { getAllBlogController, createBlogController, updateBlogController, getBlogIdController, deleteBlogController, userController } = require('../Controller/blogController');
const router = express.Router();

// GET || get all blogs
router.get('/all-blog', getAllBlogController);

//POST || create blog
router.post('/create-blog', createBlogController)

//PUT || update blog
router.put('/update-blog/:id', updateBlogController)

// GET || Single Blog Details
router.get('/get-blog/:id', getBlogIdController)

//DELETE || remove blog
router.delete('/delete-blog/:id', deleteBlogController)

// GET || user blog
router.get('/user-blog/:id', userController)

module.exports = router
