import { Router } from 'express';
// import logindMiddleware from '../middlewares/loginMiddleware';
import MatchController from '../controllers/MatchController';
import MatchService from '../services/MatchService';
import authorizationToken from '../middlewares/authMidlleware';

const matchRouter = Router();
const matchService = new MatchService();
const matchController = new MatchController(matchService);

matchRouter.get('/', matchController.getMatches);
matchRouter.post('/', authorizationToken, matchController.insertMatches);

export default matchRouter;
