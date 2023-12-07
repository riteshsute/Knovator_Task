const express = require('express');
const { appendFile } = require('fs');
const mongoose = require('mongoose')

const app = express();

const authRoutes = require('./routes/authRoute');
const postRoutes = require('./routes/postRoute');

app.use(authRoutes);
app.use(postRoutes);

mongoose
  .connect(
    "mongodb+srv://suteritesh:yCAEwLFgg22ACT1M@cluster0.eoz3yi0.mongodb.net/todosapp?retryWrites=true&w=majority",
  )
  .then(() => {
    app.listen(5000);
    console.log('Server connected');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });