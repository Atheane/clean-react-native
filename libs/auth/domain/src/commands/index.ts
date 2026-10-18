import { Dayjs } from 'dayjs';
import { IGender } from '../types';
import { Email } from '../valueObjects';

export type ILoginCommand = {
  email: Email;
  password: string;
};

export type IResetPasswordCommand = {
  email: Email;
};

export type IRegisterIdentityCommand = {
  gender: IGender;
  firstName: string;
  lastName: string;
  nationality: string;
};

export type IRegisterPasswordCommand = {
  password: string;
};

export type IRegisterBirthCommand = {
  birthday: Dayjs;
  birthCountry: string;
};

export type IRegisterAddressCommand = {
  str: string;
  city: string;
  zip: string;
  country: string;
};
