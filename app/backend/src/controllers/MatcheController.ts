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
}