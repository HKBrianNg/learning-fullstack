import express from 'express';
import { signup, signin, getusers } from '../controllers/user.js';

const userRoutes = express.Router();

// http://localhost:5000/user/signup
userRoutes.post('/signup', signup);

// http://locathost:5000/user/signin
userRoutes.post('/signin', signin);

// http://locathost:5000/user
userRoutes.get('/', getusers);

export default userRoutes;