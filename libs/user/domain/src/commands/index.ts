import { Dayjs } from 'dayjs';
import { IAddress, IEmailNotifications, IGender, ILanguage, IPhoneNotifications } from '../types';
import { BirthDay, Country, PhoneOtp } from '../value-objects';
import { Phone } from '@clean-rn/contact/domain';
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
  address: IAddress;
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
  lang?: ILanguage;
};

export type IUpdateUserCommand = {
  firstName?: string;
  lastName?: string;
  birthDay?: BirthDay;
  birthCountry?: Country;
  nationality?: Country;
  address?: {
    str: string;
    city: string;
    zip: string;
    country: Country;
  };
  USPerson?: boolean;
};
