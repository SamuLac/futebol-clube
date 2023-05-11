import Team from '../database/models/TeamModel';

export default class TeamService {
  static async getAllTeams(): Promise<Team[]> {
    const teams = await Team.findAll();

    return teams;
  }
}
