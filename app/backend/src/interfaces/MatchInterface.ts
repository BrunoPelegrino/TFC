interface IMatch {
  id?: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

interface IUpdateScore {
  homeTeamGoals: number,
  awayTeamGoals: number
}

export { IUpdateScore, IMatch };
