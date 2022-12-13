import { NextFunction, Request, Response } from 'express';
import leaderboardHomeService from '../utils/leaderBoardTable';

class LeaderBoardController {
  getLeaderBoard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allTeams = await leaderboardHomeService();
      return res.status(200).json(allTeams);
    } catch (error) {
      next(error);
    }
  };
}

export default LeaderBoardController;
