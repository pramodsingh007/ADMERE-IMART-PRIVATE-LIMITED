// middleware/auth.js
import jwt from 'jsonwebtoken';
import { secretKey } from '../config/config.js';

export const authenticate = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  console.log(token)
  if (!token) return res.status(401).send({ message: 'No token provided' });

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(401).send({ message: 'Invalid token' });
    req.user = decoded;
    next();
  });
};

export const authorize = (role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return res.status(403).send({ message: 'Forbidden' });
    }
    next();
  };
};

