import express from 'express';
import * as authController from '../controllers';
import { validateData } from '../middlewares';
import { loginSchema } from '../schemas';

const authRouter = express.Router();

authRouter.post('/login', validateData(loginSchema), authController.login);

export default authRouter;
