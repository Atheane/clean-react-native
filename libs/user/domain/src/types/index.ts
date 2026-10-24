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
}
