import express from 'express';
import {User} from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const userRouter = express.Router();
import {secretKey} from '../config/config.js';


userRouter.post('/signup', async (req, res) => {
    const { username, email, password, role } = req.body;
  console.log(req.body)
    // Check if the role is valid
    if (!['admin', 'editor', 'viewer'].includes(role)) {
      return res.status(400).send({ message: 'Invalid role' });
    }
  
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: 'User already exists' });
    }
  
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    // Create a new user
    const user = new User({
      username,
      email,
      password: hashedPassword,
      role
    });
  
    try {
      await user.save();
      res.send({ message: 'User created successfully', });
    } catch (error) {
      res.status(500).send({ message: 'Error creating user' });
    }
  });

userRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).send({ message: 'Invalid email or password' });
    console.log(user)
  const isValidPassword = bcrypt.compare(password,user.password);
  if (!isValidPassword) return res.status(401).send({ message: 'Invalid email or password' });

  const token = jwt.sign({ _id: user.id, role: user.role }, secretKey, { expiresIn: '1h' });
  res.send({ token });
});

export default userRouter;