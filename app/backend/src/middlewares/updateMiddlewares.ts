import { NextFunction, Request, Response } from 'express';
import TeamService from '../services/TeamService';

const updateMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const teamService = new TeamService();
  const { homeTeam, awayTeam } = req.body;
  const getHomeTeam = await teamService.getTeamById(homeTeam);
  const getAwayTeam = await teamService.getTeamById(awayTeam);

  if (homeTeam === awayTeam) {
    res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }

  if (!getHomeTeam || !getAwayTeam) {
    res.status(404)
      .json({ message: 'There is no team with such id!' });
  }

  next();
};

export default updateMiddleware;
