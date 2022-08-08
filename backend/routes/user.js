import express from 'express';
import { signupUser, loginUser, getUsers } from '../controllers/userController.js';

const router = express.Router();

// Singup user
router.post('/signup', signupUser);

// Login user
router.post('/login', loginUser);

//Get all users
router.get('/', getUsers);

export default router;