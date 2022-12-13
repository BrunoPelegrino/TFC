import { ILeaderBoard, IMatchLeaderBoard } from '../interfaces/LeaderbordInterface';
import Match from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';

export default class LeaderboardService {
  private leaderBoard: ILeaderBoard[] = [];
  constructor(private allTeams: Team[], private allMatches: Match[]) {
    this.createTable();
  }

  get classification(): ILeaderBoard[] {
    return this.leaderBoard;
  }

  private static totalPoints(match: IMatchLeaderBoard[]): number {
    let points = 0;
    match.forEach((m) => {
      if (m.homeTeamGoals > m.awayTeamGoals) points += 3;
      if (m.homeTeamGoals === m.awayTeamGoals) points += 1;
    });
    return points;
  }

  private static victories(match: IMatchLeaderBoard[]): number {
    let totalVictories = 0;
    match.forEach((m) => {
      if (m.homeTeamGoals > m.awayTeamGoals) totalVictories += 1;
    });
    return totalVictories;
  }

  private static draws(match: IMatchLeaderBoard[]): number {
    let totalDraws = 0;
    match.forEach((m) => {
      if (m.homeTeamGoals === m.awayTeamGoals) totalDraws += 1;
    });
    return totalDraws;
  }

  private static losses(match: IMatchLeaderBoard[]): number {
    let totalLosses = 0;
    match.forEach((m) => {
      if (m.homeTeamGoals < m.awayTeamGoals) totalLosses += 1;
    });
    return totalLosses;
  }

  private static goalsFavor(match: IMatchLeaderBoard[]): number {
    let totalGoals = 0;
    match.forEach((m) => {
      totalGoals += m.homeTeamGoals;
    });
    return totalGoals;
  }

  private static goalsOwn(match: IMatchLeaderBoard[]): number {
    let totalGoals = 0;
    match.forEach((m) => {
      totalGoals += m.awayTeamGoals;
    });
    return totalGoals;
  }

  private static goalsDifference(match: IMatchLeaderBoard[]): number {
    const gd = LeaderboardService.goalsFavor(match) - LeaderboardService.goalsOwn(match);
    return gd;
  }

  private static efficiency(match: IMatchLeaderBoard[]): number {
    const J = match.length * 3;
    const P = LeaderboardService.totalPoints(match);
    const efficiency: number = (P / J) * 100;

    return Number(efficiency.toFixed(2));
  }

  private createTable(): void {
    this.allTeams.forEach((team) => {
      const { allMatches } = this;
      const filteredMatch = allMatches
        .filter((m) => m.homeTeam === team.id);
      const name = team.teamName;
      const t = { name,
        totalPoints: LeaderboardService.totalPoints(filteredMatch),
        totalGames: filteredMatch.length,
        totalVictories: LeaderboardService.victories(filteredMatch),
        totalDraws: LeaderboardService.draws(filteredMatch),
        totalLosses: LeaderboardService.losses(filteredMatch),
        goalsFavor: LeaderboardService.goalsFavor(filteredMatch),
        goalsOwn: LeaderboardService.goalsOwn(filteredMatch),
        goalsBalance: LeaderboardService.goalsDifference(filteredMatch),
        efficiency: LeaderboardService.efficiency(filteredMatch) };
      this.leaderBoard.push(t);
    });
  }
}
