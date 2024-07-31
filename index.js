import express from 'express';
import mongoose from 'mongoose';
import bodyParser from  'body-parser';
import blogController from './controllers/blogController.js';
import userController from './controllers/userController.js';

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/blog', { useNewUrlParser: true, useUnifiedTopology: true });

//port
const port = 8000;

app.use('/',userController)
app.use('/posts',blogController);


// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});