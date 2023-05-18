import Matche from '../database/models/MatchesModel';
import MatcheService from './MatcheService';
import TeamService from './TeamService';
import Board from '../interfaces/Board';

export default class LeaderboardService {
  public static async getBoard() {
    const teams = await TeamService.getAllTeams();
    const board = Promise.all(teams.map(async (team) => {
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
        goalsBalance: this.getGoalsBalance(matches),
        efficiency: this.getEfficiency(matches),
      };
    }));
    const boardSorted = this.sortTeams(await board);
    return boardSorted;
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
    const goalsFavor = matches.reduce((acc, current) => acc + current.homeTeamGoals, 0);
    return goalsFavor;
  }

  public static getGoalsOwn(matches: Matche[]) {
    const goalsOwn = matches.reduce((acc, current) => (acc + current.awayTeamGoals), 0);
    return goalsOwn;
  }

  public static getGoalsBalance(matches: Matche[]) {
    const goalsOwn = this.getGoalsOwn(matches);
    const goalsFavor = this.getGoalsFavor(matches);
    const goalsBalance = goalsFavor - goalsOwn;
    return goalsBalance;
  }

  public static getEfficiency(matches: Matche[]) {
    const totalPoints = this.getTotalPoints(matches);
    const totalGames = matches.length;
    const efficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
    return efficiency;
  }

  private static sortTeams(board: Board[]) {
    board.sort((b, a) => {
      if (a.totalPoints === b.totalPoints) {
        if (a.totalVictories === b.totalVictories) {
          if (a.goalsBalance === b.goalsBalance) {
            return a.goalsFavor - b.goalsFavor;
          }
          return a.goalsBalance - b.goalsBalance;
        }
        return a.totalVictories - b.totalVictories;
      }
      return a.totalPoints - b.totalPoints;
    }); return board;
  }
}
