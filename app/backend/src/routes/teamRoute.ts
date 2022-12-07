import { Router } from 'express';
import TeamService from '../services/TeamService';
import TeamController from '../controllers/TeamController';

const teamRouter = Router();
const teamService = new TeamService();
const teamController = new TeamController(teamService);

teamRouter.get('/', teamController.getTeams);
teamRouter.get('/:id', teamController.getTeamById);

export default teamRouter;
