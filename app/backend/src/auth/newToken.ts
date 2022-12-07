import * as jwt from 'jsonwebtoken';
import IUser from '../interfaces/UserInterface';

import 'dotenv/config';

const secret = process.env.JWT_SECRET;

const newToken = (user: IUser) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const payload = { email: user.email };

  const token = jwt.sign(
    payload,
    secret as string,
    jwtConfig as jwt.SignOptions,
  );

  return token;
};

const authToken = (token: string): jwt.JwtPayload => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET as jwt.Secret);
  return decoded as jwt.JwtPayload;
};

export { newToken,
  authToken };
