import { Email } from '@clean-rn/auth/domain';
import { Phone, PhoneOtp } from '../value-objects';

export type ISearchEmailQuery = {
  email: Email;
};

export type ISearchPhoneQuery = {
  phone: Phone;
};

export type IValidatePhoneQuery = {
  phone: Phone;
  phoneOtp: PhoneOtp;
};
