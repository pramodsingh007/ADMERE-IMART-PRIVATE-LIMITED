import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
  title: String,
  content: String
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

export default BlogPost