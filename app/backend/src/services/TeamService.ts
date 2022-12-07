// import ITeam from '../interfaces/TeamInterface';
import Team from '../database/models/TeamModel';

class TeamService {
  constructor(private teamModel = Team) {}

  async getTeams() {
    const allTeams = await this.teamModel.findAll();
    return allTeams;
  }
}

export default TeamService;
