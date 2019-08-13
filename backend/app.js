const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');
const postRoutes = require('./routes/posts');

const app = express();

mongoose.connect('mongodb+srv://Garima:HTMvGHPEZTSsOWZg@cluster0-tx4go.mongodb.net/node-angular?retryWrites=true&w=majority')
  .then(() => {
    console.log('Database Connected Successfully');
  })
  .catch((e) => {
    console.log('Database connection failed', e);
  })

app.use(bodyParser.json({ useNewUrlParser: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});
// HTMvGHPEZTSsOWZg   Garima
// OwiL2SAP3yyNwsup    Saransh

app.use('/api/posts',postRoutes);

module.exports = app;
