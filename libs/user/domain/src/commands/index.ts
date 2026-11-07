import { Dayjs } from 'dayjs';
import { IAddress, IEmailNotifications, IGender, ILanguage, IPhoneNotifications } from '../types';
import { BirthDay, Country, PhoneOtp } from '../value-objects';
import { Phone } from '@clean-rn/contact/domain';
import { User } from '../entities';
import { APP_USER_MONTHLY_INCOME_RANGE, APP_USER_OCCUPATION, APP_USER_PERSONAL_ASSETS_RANGE } from '../types';

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

export type IRegisterRevenuesCommand = {
  income: APP_USER_MONTHLY_INCOME_RANGE;
  assets: APP_USER_PERSONAL_ASSETS_RANGE;
  occupation: APP_USER_OCCUPATION;
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
  revenues?: IRegisterRevenuesCommand;
};
