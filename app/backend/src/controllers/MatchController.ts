import { NextFunction, Request, Response } from 'express';
import MatchService from '../services/MatchService';

class MatchController {
  private matchService: MatchService;
  constructor(matchservice: MatchService) {
    this.matchService = matchservice;
  }

  getMatches = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allMathces = await this.matchService.getAllMatches();
      return res.status(200).json(allMathces);
    } catch (error) {
      next(error);
    }
  };
}

export default MatchController;
