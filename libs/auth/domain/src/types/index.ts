import { BirthDay, Country } from '../valueObjects';

export type IAuth = {
  accessToken: string;
  refreshToken: string;
};

export enum IUserStatus {
  PROSPECT = 'PROSPECT',
  ACTIVE = 'ACTIVE',
}

export type IIdentity = {
  gender: IGender;
  firstName: string;
  lastName: string;
};

export type IBirth = {
  birthday: BirthDay;
  birthCountry: Country;
  nationality: Country;
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
  MAN = 'MAN',
  WOMAN = 'WOMAN',
  NEUTRAL = 'NEUTRAL', // KycProvider do not allow for neutral, but still, we want to offer this option to user. Encoding is not correct, but it is mapped to KycProvider third option so as to keep "third option" information.
}

export type ISuccess = {
  success: boolean;
};
