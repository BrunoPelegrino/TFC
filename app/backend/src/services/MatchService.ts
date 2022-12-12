import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';
import { IMatch, IUpdateScore } from '../interfaces/MatchInterface';

class MatchService {
  constructor(private matchModel = Match) {}

  async getAllMatches() {
    const matches = await this.matchModel.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return matches;
  }

  async getAllMatchesInProgress(inProgress: boolean) {
    const matches = await this.matchModel.findAll({
      where: { inProgress },
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return matches;
  }

  async insertMatch(match: IMatch) {
    const { homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress } = match;
    const addMatch = await this.matchModel.create({ homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress });
    return addMatch;
  }

  async updateInProgress(id: number) {
    const update = await this.matchModel.update({ inProgress: false }, { where: { id } });
    return update;
  }

  async updateScore(score: IUpdateScore, id: number) {
    const update = await this.matchModel.update(score, { where: { id } });
    return update;
  }
}

export default MatchService;
