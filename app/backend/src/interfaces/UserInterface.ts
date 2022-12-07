interface IUser {
  email: string;
  password: string;
}

interface IUserPayload extends IUser {
  id: number;
  role: string;
}

export { IUser,
  IUserPayload,
};
