// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require('crypto');
const axios = require('axios');

// Create express app
const app = express();
// Set app to use body parser
app.use(bodyParser.json());
// Set app to use cors
app.use(cors());

// Create comments object
const commentsByPostId = {};

// Create endpoint for fetching comments
app.get('/posts/:id/comments', (req, res) => {
  // Send back comments for post id
  res.send(commentsByPostId[req.params.id] || []);
});

// Create endpoint for creating comments
app.post('/posts/:id/comments', async (req, res) => {
  // Create random id for comment
  const commentId = randomBytes(4).toString('hex');
  // Get content from body
  const { content } = req.body;
  // Get comments for post id
  const comments = commentsByPostId[req.params.id] || [];
  // Add new comment to comments
  comments.push({ id: commentId, content, status: 'pending' });
  // Set comments to commentsByPostId
  commentsByPostId[req.params.id] = comments;

  //