import { Dayjs } from 'dayjs';
import { IGender } from '../types';
import { Email, Phone, PhoneOtp, Password } from '../valueObjects';
import { User } from '../entities';

export type ILoginCommand = {
  email: Email;
  password: Password;
};

export type IResetPasswordCommand = {
  email: Email;
};

export type IRegisterIdentityCommand = {
  gender: IGender;
  firstName: string;
  lastName: string;
};

export type IRegisterPasswordCommand = {
  password: string;
};

export type IRegisterBirthCommand = {
  birthday: Dayjs;
  birthCountry: string;
  nationality: string;
};

export type IRegisterAddressCommand = {
  str: string;
  city: string;
  zip: string;
  country: string;
  USPerson: boolean;
};

export type ISendPhoneValidationCommand = {
  phone: Phone;
};

export type ISignupUserCommand = {
  user: User;
  phoneOtp: PhoneOtp;
};
