import { Router } from 'express';
import MatcheController from '../controllers/MatcheController';
import authentication from '../middlewares/authentication';

const matcheRouter = Router();

matcheRouter.patch(
  '/:id/finish',
  (req, res, next) => authentication(req, res, next),
  (req, res) => MatcheController.finishMatche(req, res),
);

matcheRouter.get('/', (req, res) => MatcheController.getAllMatches(req, res));

export default matcheRouter;
