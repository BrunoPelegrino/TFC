import { NextFunction, Request, Response } from 'express';
// import { StatusCodes } from 'http-status-codes';
import LoginService from '../services/LoginService';

class UserController {
  private userService: LoginService;

  constructor(userService: LoginService) {
    this.userService = userService;
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const token = await this.userService.login({ email, password });
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };
}
export default UserController;
