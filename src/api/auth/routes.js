import { Router } from 'express';
import { loginController, regController } from './controller';
import validation from '../../middleware/validation.middleware';
import { registrationSchema } from '../../validation/auth.validation';
import passport from '../../config/passport';

const router = Router();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  loginController
);

router.post('/register', validation(registrationSchema), regController);

export default router;
