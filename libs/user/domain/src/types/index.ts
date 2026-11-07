import { BirthDay, Country } from '../value-objects';

export type IIdentity = {
  gender: IGender;
  firstName: string;
  lastName: string;
};

export type IBirth = {
  birthday: BirthDay;
  birthCountry?: Country;
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

export enum KYC_REVIEW {
  NONE = 0, // No review yet
  PENDING = 1,
  VALIDATED = 2, // Review was successful
  REFUSED = 3,
  INVESTIGATING = 4,
  CLOSED = 5,
  REMEDIATION = 6, // User needs to proceed a remediation
  REMEDIATION_PENDING = 7, // User is under validation of a remediation
}

export enum IPhoneNotifications {
  CARD_CREATION = 'CARD_CREATION',
  CARD_DELIVERY = 'CARD_DELIVERY',
  CARD_TRANSACTION_FAILED = 'CARD_TRANSACTION_FAILED',
  CARD_TRANSACTION_MODIFIED = 'CARD_TRANSACTION_MODIFIED',
  CARD_TRANSACTION_SETTLED = 'CARD_TRANSACTION_SETTLED',
  KYC_FAILED = 'KYC_FAILED',
  KYC_SUCCESS = 'KYC_SUCCESS',
  PAYIN_RECEIVED = 'PAYIN_RECEIVED',
  PAYOUT_INITIATED = 'PAYOUT_INITIATED',
}

export enum IEmailNotifications {
  CARD_CREATION = 'CARD_CREATION',
  CARD_DELIVERY = 'CARD_DELIVERY',
  CARD_LOCK = 'CARD_LOCK',
  CARD_PIN_UPDATED = 'CARD_PIN_UPDATED',
  CARD_UNLOCK = 'CARD_UNLOCK',
  KYC_FAILED = 'KYC_FAILED',
  KYC_VALIDATED = 'KYC_VALIDATED',
  PASSWORD_RESET = 'PASSWORD_RESET',
  WAITING_TRANSACTION_REFUND = 'WAITING_TRANSACTION_REFUND',
}

export enum ILanguage {
  EN = 'EN',
  FR = 'FR',
  ES = 'ES',
  IT = 'IT',
  DE = 'DE',
  EL = 'GR',
  PT = 'PT',
}

export enum IUserType {
  BANK_USER = 40133439,
  ENERGY_APP_USER = 87300973,
  ENERGY_APP_USER = 7658009,
  KELVIN_USER = 102003790,
}

export enum APP_USER_MONTHLY_INCOME_RANGE {
  K2 = 2, // 1000 - 1800 Euros per month
  K4 = 3, // 1801 - 3500 Euros per month
  K5 = 4, // 3501 - 5000 Euros per month
  K7 = 5, // 5001 - 6500 Euros per month
  K10 = 6, // 6501 - 10000 Euros per month
  KN = 7, //Greater than 10000 Euros per month
}

export enum APP_USER_OCCUPATION {
  UNEMPLOYED = 3, // Without professional activity
  EMPLOYEE = 5, // Employee in the private sector
  PUBLIC_EMPLOYEE = 8, // Employee and Officer in the public sector
}

export enum APP_USER_PERSONAL_ASSETS_RANGE {
  A0 = 0, //	None
  A4 = 4, //	From 150 001 Euros to 350 000 Euros
  A5 = 5, //	From 350 001 Euros to 750 000 Euros
  A6 = 6, //	From 750 001 Euros to 1 500 000 Euros
}
