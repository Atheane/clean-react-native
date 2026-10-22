import { Email, Password } from '../value-objects';

export type ILoginCommand = {
  email: Email;
  password: Password;
};

export type IResetPasswordCommand = {
  email: Email;
};
