import { compareSync } from 'bcryptjs';

const checkPassword = (bodyPassword: string, userPassword: string):boolean =>
  compareSync(bodyPassword, userPassword);

export default checkPassword;
