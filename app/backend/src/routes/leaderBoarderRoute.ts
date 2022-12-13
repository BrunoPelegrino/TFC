import { Router } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';

const leaderBoardRouter = Router();
const leaderBoardController = new LeaderBoardController();

leaderBoardRouter.get('/home', leaderBoardController.getLeaderBoard);

export default leaderBoardRouter;
