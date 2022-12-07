/* import * as jwt from 'jsonwebtoken';
import IUser from '../interfaces/UserInterface';

require('dotenv/config');

class JWT {
  public createToken = (data: IUser) => {
    const secret = process.env.JWT_SECRET || 'jwt_secret';
    const token = jwt.sign(data, secret);
    return token;
  };

  validateToken = (token: string): jwt.JwtPayload => {
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET || 'jwt_secret');
      return data as jwt.JwtPayload;
    } catch (error) {
      return { type: 400 };
    }
  };
}

export default JWT; */
