// src/controllers/postController.js
const Post = require('../models/post');

exports.createPost = async (req, res) => {
    try {
      const { title, body, latitude, longitude } = req.body;
      const createdBy = req.userId; 
  
      const newPost = new Post({ title, body, createdBy, latitude, longitude });
      await newPost.save();
  
      res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

exports.getAllPosts = async (req, res) => {
    try {
      const posts = await Post.find();

      res.json(posts);

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  exports.getPostById = async (req, res) => {
    try {

      const postId = req.params.id;

      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      res.json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  exports.updatePostById = async (req, res) => {
    try {

      const postId = req.params.id;
      const { title, body, latitude, longitude } = req.body;
  
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { title, body, latitude, longitude },
        { new: true }
      );
  
      if (!updatedPost) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      res.json({ message: 'Post updated successfully', post: updatedPost });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  exports.deletePostById = async (req, res) => {
    try {

      const postId = req.params.id;

      const deletedPost = await Post.findByIdAndDelete(postId);
  
      if (!deletedPost) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


exports.getPostsByLocation = async (req, res) => {
    try {
      const { latitude, longitude } = req.query;
      const posts = await Post.find({ latitude, longitude });
  
      res.json(posts);

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  
  exports.getCountOfActiveAndInactivePosts = async (req, res) => {
    try {

      const activeCount = await Post.countDocuments({ active: true });
      const inactiveCount = await Post.countDocuments({ active: false });
  
      res.json({ activeCount, inactiveCount });
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };