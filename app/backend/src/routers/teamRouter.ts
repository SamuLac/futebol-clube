import { Router } from 'express';
import TeamsController from '../controllers/ TeamController';

const teamsRouter = Router();

teamsRouter.get('/', (req, res) => TeamsController.getAllTeams(req, res));

export default teamsRouter;
