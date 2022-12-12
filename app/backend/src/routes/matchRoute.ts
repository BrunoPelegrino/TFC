import { Router } from 'express';
// import logindMiddleware from '../middlewares/loginMiddleware';
import MatchController from '../controllers/MatchController';
import MatchService from '../services/MatchService';
import authorizationToken from '../middlewares/authMidlleware';
import updateMiddleware from '../middlewares/updateMiddlewares';

const matchRouter = Router();
const matchService = new MatchService();
const matchController = new MatchController(matchService);

matchRouter.get('/', matchController.getMatches);
matchRouter.post('/', authorizationToken, updateMiddleware, matchController.insertMatches);
matchRouter.patch('/:id/finish', matchController.updateInProgress);
matchRouter.patch('/:id', matchController.updateScore);

export default matchRouter;
