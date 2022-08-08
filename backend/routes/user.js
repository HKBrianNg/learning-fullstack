import express from 'express';
import { signup, signin, getusers } from '../controllers/userController.js';

const router = express.Router();

// http://localhost:5000/user/signup
router.post('/signup', signup);

// http://locathost:5000/user/signin
router.post('/signin', signin);

// http://locathost:5000/user
router.get('/', getusers);

export default router;