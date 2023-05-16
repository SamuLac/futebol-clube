import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import validateLogin from '../middlewares/validateLogin';
import authentication from '../middlewares/authentication';

const loginRouter = Router();

loginRouter.get(
  '/role',
  (req, res, next) => authentication(req, res, next),
  (req, res) => LoginController.loginRole(req, res),
);

loginRouter.post(
  '/',
  (req, res, next) => validateLogin(req, res, next),
  (req, res) => LoginController.login(req, res),
);

export default loginRouter;
