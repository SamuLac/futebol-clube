import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamsController {
  static async getAllTeams(_req: Request, res: Response):Promise<void> {
    const teams = await TeamService.getAllTeams();
    res.status(200).json(teams);
  }

  static async getTeamById(req: Request, res: Response):Promise<void> {
    const { id } = req.params;
    const teams = await TeamService.getTeamById(Number(id));
    res.status(200).json(teams);
  }
}
