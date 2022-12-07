import { NextFunction, Request, Response } from 'express';
import TeamService from '../services/TeamService';

class TeamController {
  private teamService: TeamService;

  constructor(teamService: TeamService) {
    this.teamService = teamService;
  }

  getTeams = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allTeams = await this.teamService.getTeams();
      return res.status(200).json(allTeams);
    } catch (error) {
      next(error);
    }
  };
}

export default TeamController;
