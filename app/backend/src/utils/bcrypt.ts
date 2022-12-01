import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

const hashPassword = (bodyPassword: string) => {
  const salt = genSaltSync(10);
  const hash = hashSync(bodyPassword, salt);
  return hash;
};

const checkPassword = (bodyPassword: string, userPassword: string):boolean =>
  compareSync(bodyPassword, userPassword);

export { hashPassword, checkPassword };
