import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';

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
}

export default MatchService;
