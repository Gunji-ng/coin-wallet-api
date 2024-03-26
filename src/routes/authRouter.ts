import { Router } from 'express';
import { login, register } from '../controllers/authController';

const authRouter = Router();

export default authRouter.post('/login', login).post('/register', register);
