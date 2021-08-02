import { Router } from 'express';
import authRouter from './api/auth';
import { version } from '../package.json';

import passport from 'passport';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'API',
    data: {
      version: `${version}`
    }
  });
});

router.use('/auth', authRouter);

export default router;
