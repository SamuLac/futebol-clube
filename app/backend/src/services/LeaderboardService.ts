import Matche from '../database/models/MatchesModel';
import MatcheService from './MatcheService';
import TeamService from './TeamService';

export default class LeaderboardService {
  public static async getBoard() {
    const teams = await TeamService.getAllTeams();
    return Promise.all(teams.map(async (team) => {
      const matches = await MatcheService.getMatcheById(team.id);
      return {
        name: team.teamName,
        totalPoints: this.getTotalPoints(matches),
        totalGames: matches.length,
        totalVictories: this.getTotalVictories(matches),
        totalDraws: this.getTotalDraws(matches),
        totalLosses: this.getTotalLosses(matches),
        goalsFavor: this.getGoalsFavor(matches),
        goalsOwn: this.getGoalsOwn(matches),
      };
    }));
  }

  public static getTotalPoints(matches: Matche[]) {
    const victoriesPoint = 3 * this.getTotalVictories(matches);
    const drawPoints = this.getTotalDraws(matches);
    const result = victoriesPoint + drawPoints;
    return result;
  }

  public static getTotalVictories(matches: Matche[]): number {
    const victories = matches.reduce((acc, curr) => (curr.homeTeamGoals > curr.awayTeamGoals
      ? acc + 1 : acc + 0), 0);
    return victories;
  }

  public static getTotalDraws(matches: Matche[]) {
    const draws = matches.reduce((acc, current) => (current.homeTeamGoals === current.awayTeamGoals
      ? acc + 1 : acc + 0), 0);
    return draws;
  }

  public static getTotalLosses(matches: Matche[]) {
    const victories = this.getTotalVictories(matches);
    const draws = this.getTotalDraws(matches);
    const losses = matches.length - victories - draws;
    return losses;
  }

  public static getGoalsFavor(matches: Matche[]) {
    const result = matches.reduce((acc, current) => acc + current.homeTeamGoals, 0);
    return result;
  }

  public static getGoalsOwn(matches: Matche[]) {
    const result = matches.reduce((acc, current) => (acc + current.awayTeamGoals), 0);
    return result;
  }
}
