import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamsController {
  constructor(
    private teamService: TeamService,
  ) {

  }

  static async getAllTeams(_req: Request, res: Response):Promise<void> {
    const teams = await TeamService.getAllTeams();
    res.status(200).json(teams);
  }
}
