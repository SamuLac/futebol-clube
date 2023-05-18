import Team from '../database/models/TeamModel';

export default class TeamService {
  static async getAllTeams(): Promise<Team[]> {
    const teams = await Team.findAll();

    return teams;
  }

  public static async getTeamById(id: number): Promise<Team | string> {
    const team = await Team.findOne({ where: { id } });
    if (!team) {
      return 'Team not found';
    }
    return team;
  }
}
