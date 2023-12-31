import Team from '../database/models/TeamModel';
import Matche from '../database/models/MatchesModel';
import TeamService from './TeamService';

export default class MatcheService {
  public static async getAllMatches(): Promise<Matche[]> {
    const matches = await Matche.findAll({ include: [{
      model: Team,
      as: 'homeTeam',
      attributes: { exclude: ['id'] } }, {
      model: Team,
      as: 'awayTeam',
      attributes: { exclude: ['id'] } }] });
    return matches;
  }

  public static async getInProgress(inProgress: string | undefined): Promise<Matche[]> {
    const matches = await Matche.findAll({
      where: { inProgress: inProgress === 'true' },
      include: [{
        model: Team,
        as: 'homeTeam',
        attributes: { exclude: ['id'] } }, {
        model: Team,
        as: 'awayTeam',
        attributes: { exclude: ['id'] } }] });
    return matches;
  }

  public static async finishMatche(id: number): Promise<{ message: string }> {
    await Matche.update({ inProgress: false }, { where: { id } });
    return { message: 'Finished' };
  }

  public static async updateMatche(id: number, goals: {
    homeTeamGoals: number, awayTeamGoals: number }): Promise<{ message: string, goals: string }> {
    await Matche.update(goals, { where: { id } });

    return { message: 'updated', goals: `${goals}` };
  }

  public static async createNewMatche(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<Matche | string> {
    const matche = {
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    };

    const homeTeam = await TeamService.getTeamById(matche.homeTeamId);
    const awayTeam = await TeamService.getTeamById(matche.awayTeamId);
    if (typeof homeTeam === 'string' || typeof awayTeam === 'string') {
      return 'There is no team with such id!';
    }

    const newMatche = await Matche.create({ ...matche, inProgress: true });

    return newMatche;
  }

  public static async getMatcheById(id: number): Promise<Matche[]> {
    const matches = await Matche.findAll({
      where: { homeTeamId: id, inProgress: false },
      include: [{
        model: Team,
        as: 'homeTeam',
        attributes: { exclude: ['id'] } }, {
        model: Team,
        as: 'awayTeam',
        attributes: { exclude: ['id'] } }] });
    return matches;
  }
}
