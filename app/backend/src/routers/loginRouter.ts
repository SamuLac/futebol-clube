import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import validateLogin from '../middlewares/validateLogin';

const loginRouter = Router();

loginRouter.post(
  '/',
  (req, res, next) => validateLogin(req, res, next),
  (req, res) => LoginController.login(req, res),
);

export default loginRouter;
