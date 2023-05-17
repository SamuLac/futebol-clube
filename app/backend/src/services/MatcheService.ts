import Team from '../database/models/TeamModel';
import Matche from '../database/models/MatchesModel';

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
}
