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

  insertMatches = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { homeTeam,
        awayTeam,
        homeTeamGoals,
        awayTeamGoals } = req.body;

      const newMatch = await this.matchService.insertMatch({ homeTeam,
        awayTeam,
        homeTeamGoals,
        awayTeamGoals,
        inProgress: true,
      });
      return res.status(201).json(newMatch);
    } catch (error) {
      next(error);
    }
  };

  updateInProgress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.matchService.updateInProgress(Number(id));
      return res.status(200).json({ message: 'finished' });
    } catch (error) {
      next(error);
    }
  };

  updateScore = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;
      await this.matchService.updateScore({ homeTeamGoals, awayTeamGoals }, Number(id));
      return res.status(200).json({ message: 'Score Updated' });
    } catch (error) {
      next(error);
    }
  };
}

export default MatchController;
