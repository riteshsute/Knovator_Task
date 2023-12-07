const express = require('express');
const postController = require('../controllers/postController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.verifyToken);

router.post('/posts', postController.createPost);
router.get('/posts', postController.getAllPosts);

router.get('/posts/:id',   postController.getPostById);
router.put('/posts/:id', postController.updatePostById);
router.delete('/posts/:id',  postController.deletePostById);

router.get('/posts/byLocation', postController.getPostsByLocation);
router.get('/posts/count', postController.getCountOfActiveAndInactivePosts);

module.exports = router;
