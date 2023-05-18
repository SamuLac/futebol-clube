import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  public static async getAll(_req: Request, res: Response) {
    const teams = await LeaderboardService.getBoard();
    return res.status(200).json(teams);
  }
}
