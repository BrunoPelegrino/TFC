import { ILeaderBoard, IMatchLeaderBoard } from '../interfaces/LeaderbordInterface';
import Match from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';

export default class LeaderBoardAwayService {
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
      if (m.awayTeamGoals > m.homeTeamGoals) points += 3;
      if (m.awayTeamGoals === m.homeTeamGoals) points += 1;
    });
    return points;
  }

  private static victories(match: IMatchLeaderBoard[]): number {
    let totalVictories = 0;
    match.forEach((m) => {
      if (m.awayTeamGoals > m.homeTeamGoals) totalVictories += 1;
    });
    return totalVictories;
  }

  private static draws(match: IMatchLeaderBoard[]): number {
    let totalDraws = 0;
    match.forEach((m) => {
      if (m.awayTeamGoals === m.homeTeamGoals) totalDraws += 1;
    });
    return totalDraws;
  }

  private static losses(match: IMatchLeaderBoard[]): number {
    let totalLosses = 0;
    match.forEach((m) => {
      if (m.awayTeamGoals < m.homeTeamGoals) totalLosses += 1;
    });
    return totalLosses;
  }

  private static goalsFavor(match: IMatchLeaderBoard[]): number {
    let totalGoals = 0;
    match.forEach((m) => {
      totalGoals += m.awayTeamGoals;
    });
    return totalGoals;
  }

  private static goalsOwn(match: IMatchLeaderBoard[]): number {
    let totalGoals = 0;
    match.forEach((m) => {
      totalGoals += m.homeTeamGoals;
    });
    return totalGoals;
  }

  private static goalsDifference(match: IMatchLeaderBoard[]): number {
    const gd = LeaderBoardAwayService.goalsFavor(match) - LeaderBoardAwayService.goalsOwn(match);
    return gd;
  }

  private static efficiency(match: IMatchLeaderBoard[]): number {
    const J = match.length * 3;
    const P = LeaderBoardAwayService.totalPoints(match);
    const efficiency: number = (P / J) * 100;

    return Number(efficiency.toFixed(2));
  }

  private createTable(): void {
    this.allTeams.forEach((team) => {
      const { allMatches } = this;
      const awayMatch = allMatches
        .filter((m) => m.awayTeam === team.id);
      const name = team.teamName;
      const t = { name,
        totalPoints: LeaderBoardAwayService.totalPoints(awayMatch),
        totalGames: awayMatch.length,
        totalVictories: LeaderBoardAwayService.victories(awayMatch),
        totalDraws: LeaderBoardAwayService.draws(awayMatch),
        totalLosses: LeaderBoardAwayService.losses(awayMatch),
        goalsFavor: LeaderBoardAwayService.goalsFavor(awayMatch),
        goalsOwn: LeaderBoardAwayService.goalsOwn(awayMatch),
        goalsBalance: LeaderBoardAwayService.goalsDifference(awayMatch),
        efficiency: LeaderBoardAwayService.efficiency(awayMatch) };
      this.leaderBoard.push(t);
    });
  }
}
