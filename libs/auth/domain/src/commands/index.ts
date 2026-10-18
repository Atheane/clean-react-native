import { Email } from '../valueObjects';

export type ILoginCommand = {
  email: Email;
  password: string;
};

export type IResetPasswordCommand = {
  email: Email;
};

export type IRegisterNameCommand = {
  firstName: string;
  lastName: string;
};

export type IRegisterPasswordCommand = {
  password: string;
};

export type IRegisterBirthCommand = {
  birthday: string;
  birthCountry: string;
};

export type IRegisterAddressCommand = {
  str: string;
  city: string;
  zip: string;
  country: string;
};
