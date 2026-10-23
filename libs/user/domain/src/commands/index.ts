import { Dayjs } from 'dayjs';
import { IEmailNotifications, IGender, IPhoneNotifications } from '../types';
import { Phone, PhoneOtp } from '../value-objects';
import { User } from '../entities';

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

export type IUpdateUserConfigCommand = {
  notifFirebaseDisabled?: IPhoneNotifications[];
  notifEmailDisabled?: IEmailNotifications[];
  lang?: string;
};
