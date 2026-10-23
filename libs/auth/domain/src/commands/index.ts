import { Email, Password } from '../value-objects';
import { Phone } from '@clean-rn/contact/domain';

export type ILoginCommand = {
  email: Email;
  password: Password;
};

export type IResetPasswordCommand = {
  email: Email;
};

export type ILogPhoneCommand = {
  email: Email;
  password: Password;
  phone: Phone;
};
