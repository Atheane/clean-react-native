import { Dayjs } from 'dayjs';
import { IAddress, IBirth, IGender, IIdentity } from '../types';
import { Email, Password, Phone, PhoneOtp } from '../valueObjects';

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
  USPerson: boolean;
};

export type ISendPhoneValidationCommand = {
  phone: Phone;
};

export type ISignupUserCommand = {
  email: Email;
  phone: Phone;
  password: Password;
  identity: IIdentity;
  birth: IBirth;
  address: IAddress;
  USPerson: boolean;
  phoneOtp: PhoneOtp;
};
