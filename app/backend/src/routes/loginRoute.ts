import { Router } from 'express';
import UserService from '../services/LoginService';
import UserController from '../controllers/LoginController';
import User from '../database/models/UserModel';
import logindMiddleware from '../middlewares/loginMiddleware';

const loginRouter = Router();
const userService = new UserService(User);
const userController = new UserController(userService);

loginRouter.post('/', logindMiddleware, userController.login);

export default loginRouter;
