import { RequestHandler } from 'express';
import { authToken } from '../auth/newToken';
import ErrorGenerate from '../utils/errorGenerate';

const authorizationToken: RequestHandler = (req, _res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new ErrorGenerate('Token not found', 400);
  }

  try {
    const decoded = authToken(authorization);
    req.headers.userId = decoded.id;

    next();
  } catch (err) {
    throw new ErrorGenerate('Token must be a valid token', 401);
  }
};

export default authorizationToken;
