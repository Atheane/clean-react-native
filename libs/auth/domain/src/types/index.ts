import { Country, Email } from '../valueObjects';

export type IAuth = {
  accessToken: string;
  refreshToken: string;
};

export type ICountry = {
  name: string;
  emoji: string;
  code: string;
};

export type IAddress = {
  str: string;
  city: string;
  zip: string;
  country: Country;
};

export enum IGender {
  MAN = 'M',
  WOMAN = 'Mme',
  NEUTRAL = 'Mlle', // KycProvider do not allow for neutral, but still, we want to offer this option to user. Encoding is not correct, but it is mapped to KycProvider third option so as to keep "third option" information.
}

export type ILoginParams = {
  email: Email;
  password: string;
};

export type IResetPasswordParams = {
  email: Email;
};
