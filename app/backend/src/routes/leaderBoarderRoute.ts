import { Router } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';

const leaderBoardRouter = Router();
const leaderBoardController = new LeaderBoardController();

leaderBoardRouter.get('/home', leaderBoardController.getHomeLeaderBoard);
leaderBoardRouter.get('/away', leaderBoardController.getAwayLeaderBoard);

export default leaderBoardRouter;
