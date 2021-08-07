import { Router } from 'express';
import authRouter from './api/auth';
import itemsRouter from './api/items';
import { version } from '../package.json';

import passport from './config/passport';

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
router.use('/items', passport.authenticate('jwt', { session: false }), itemsRouter);

export default router;
