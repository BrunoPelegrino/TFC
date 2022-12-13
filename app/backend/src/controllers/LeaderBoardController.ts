import { NextFunction, Request, Response } from 'express';
import leaderboardAwayService from '../utils/leaderBoardAwayTable';
import leaderboardHomeService from '../utils/leaderBoardHomeTable';

class LeaderBoardController {
  getHomeLeaderBoard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const homeTeams = await leaderboardHomeService();
      return res.status(200).json(homeTeams);
    } catch (error) {
      next(error);
    }
  };

  getAwayLeaderBoard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const awayTeams = await leaderboardAwayService();
      return res.status(200).json(awayTeams);
    } catch (error) {
      next(error);
    }
  };
}

export default LeaderBoardController;
