import { StatusCodes } from 'http-status-codes';
import ErrorGenerate from '../../utils/errorGenerate';
import { checkPassword } from '../../utils/bcrypt';

import User from '../models/UserModel';

class LoginService {
  constructor(private userModel = User) {}

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({
      where: { email },
    });

    if (!user || !checkPassword(email, password)) {
      throw new ErrorGenerate('Incorrect email or password', StatusCodes.UNAUTHORIZED);
    }
  }
}
export default LoginService;
