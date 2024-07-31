import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: { type: String, enum: ['admin', 'editor', 'viewer'] }
});

export const User = mongoose.model('User', userSchema);

