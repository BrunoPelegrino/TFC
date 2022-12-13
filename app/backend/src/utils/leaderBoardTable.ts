import LeaderboardService from '../services/LeaderBoardService';
import MatchService from '../services/MatchService';
import TeamService from '../services/TeamService';

async function leaderboardHomeService() {
  const matchService = new MatchService();
  const teamsService = new TeamService();
  const allmatch = await matchService.finishedMatches();
  const listTeams = await teamsService.getTeams();
  const table = new LeaderboardService(listTeams, allmatch);

  const classification = table.classification.sort((b, a) => a.totalPoints - b.totalPoints
    || a.totalVictories - b.totalVictories
    || a.goalsBalance - b.goalsBalance
    || a.goalsFavor - b.goalsFavor
    || b.goalsOwn - a.goalsOwn);
  return classification;
}

export default leaderboardHomeService;
