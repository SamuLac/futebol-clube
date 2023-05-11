import Team from '../database/models/TeamModel';

export default class TeamService {
  static async getAllTeams(): Promise<Team[]> {
    const teams = await Team.findAll();

    return teams;
  }

  public static async getTeamById(id: number): Promise<Team> {
    const team = await Team.findOne({ where: { id } });
    if (!team) {
      throw new Error('Team not found');
    }
    return team;
  }
}
