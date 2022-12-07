// import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import ErrorGenerate from '../utils/errorGenerate';

const logindMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ErrorGenerate('All fields must be filled', 400);
  }
  if (password.length < 6) {
    throw new ErrorGenerate('Password must be at least 6', 400);
  }

  next();
};

export default logindMiddleware;
