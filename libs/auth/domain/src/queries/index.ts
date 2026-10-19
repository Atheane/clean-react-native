import { Email, Phone, PhoneOtp } from '../valueObjects';

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
