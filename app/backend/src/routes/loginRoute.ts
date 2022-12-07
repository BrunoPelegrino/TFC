import { Router } from 'express';
import UserService from '../services/LoginService';
import UserController from '../controllers/LoginController';
import User from '../database/models/UserModel';
import logindMiddleware from '../middlewares/loginMiddleware';
import authorizationToken from '../middlewares/authMidlleware';

const loginRouter = Router();
const userService = new UserService(User);
const userController = new UserController(userService);

loginRouter.post('/', logindMiddleware, userController.login);
loginRouter.get('/validate', authorizationToken, userController.userRole);

export default loginRouter;
