import { Request, Response } from 'express';
import MatcheService from '../services/MatcheService';

export default class MatcheController {
  public static async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (typeof inProgress === 'string') {
      const matches = await MatcheService.getInProgress(inProgress);
      return res.status(200).json(matches);
    }
    const matches = await MatcheService.getAllMatches();
    return res.status(200).json(matches);
  }

  public static async finishMatche(req: Request, res: Response) {
    const { id } = req.params;
    const finished = await MatcheService.finishMatche(Number(id));
    return res.status(200).json(finished);
  }

  public static async updateMatche(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const goals = { homeTeamGoals, awayTeamGoals };
    const message = await MatcheService.updateMatche(
      Number(id),
      goals,
    );
    return res.status(200).json(message);
  }

  public static async createNewMatche(req: Request, res: Response) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;

    if (homeTeamId === awayTeamId) {
      return res.status(422).json({
        message: 'It is not possible to create a match with two equal teams',
      });
    }

    const matche = await MatcheService.createNewMatche(
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    );

    if (typeof matche === 'string') {
      return res.status(404).json({ message: matche });
    }
    return res.status(201).json(matche);
  }
}
