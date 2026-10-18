import { Email, Phone, PhoneOtp } from '../valueObjects';

export type ICheckEmailQuery = {
  email: Email;
};

export type ICheckPhoneQuery = {
  phone: Phone;
};

export type IValidatePhoneQuery = {
  phone: Phone;
  otp: PhoneOtp;
};
