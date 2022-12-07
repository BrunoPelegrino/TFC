// import { StatusCodes } from 'http-status-codes';
import ErrorGenerate from '../utils/errorGenerate';
import checkPassword from '../utils/bcrypt';

import User from '../database/models/UserModel';

import IUser from '../interfaces/UserInterface';
import { newToken } from '../auth/newToken';

class LoginService {
  constructor(private userModel = User) {}
  // omitir password
  async login(user : IUser) {
    const userLogin = await this.userModel.findOne({
      where: { email: user.email },
    });
    if (!userLogin) {
      throw new ErrorGenerate('Incorrect email or password', 401);
    }
    if (checkPassword(user.password, userLogin.password) === false) {
      throw new ErrorGenerate('Incorrect email or password', 401);
    }
    /* if (!userLogin.email || !userLogin.password) {
      throw new ErrorGenerate('All fields must be filled', 400);
    } */
    const { email, password } = userLogin;
    const token = newToken({ email, password });
    return token;
  }
}
export default LoginService;
