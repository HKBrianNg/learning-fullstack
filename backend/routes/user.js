import express from 'express';
import { signupUser, loginUser, getUsers, getUser, updateUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

// Singup user
router.post('/signup', signupUser);

// Login user
router.post('/login', loginUser);

//Get all users
router.get('/', getUsers);

//Get a user
router.get('/:id', getUser);

// Update a user
router.patch('/:id', updateUser);

// Delete a user
router.delete('/:id', deleteUser);

export default router;