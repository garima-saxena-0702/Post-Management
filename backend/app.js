const express = require('express');
const app = express();

app.use('/api/posts', (req, res, next) => {
  const post = [
    { id: 'fadf124211', title: 'First server-side Post', content: 'This is coming from the server'},
    { id: 'kadk213119', title: 'Second server-side Post', content: 'This is coming from the server as well'}
  ]
  res.status(200).json({
    message: 'Post send successfully',
    posts: post
  });
})

module.exports = app;
