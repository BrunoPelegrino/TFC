import { NextFunction, Request, Response } from 'express';
import MatchService from '../services/MatchService';

class MatchController {
  private matchService: MatchService;
  constructor(matchservice: MatchService) {
    this.matchService = matchservice;
  }

  getMatches = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { inProgress } = req.query;
      if (!inProgress) {
        const allMathces = await this.matchService.getAllMatches();
        return res.status(200).json(allMathces);
      }
      if (inProgress === 'true') {
        const matches = await this.matchService
          .getAllMatchesInProgress(true);
        return res.status(200).json(matches);
      } if (inProgress === 'false') {
        const matches = await this.matchService
          .getAllMatchesInProgress(false);
        return res.status(200).json(matches);
      }
    } catch (error) {
      next(error);
    }
  };
}

export default MatchController;
