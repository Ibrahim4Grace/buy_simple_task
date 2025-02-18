import express from 'express';
const router = express.Router();

import authRoute from './authRoutes';
import loanRoute from './loanRoutes';

router.use('/auth', authRoute);
router.use('/users', loanRoute);

export { router };
