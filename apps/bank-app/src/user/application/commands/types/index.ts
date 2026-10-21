import { IDomainError } from '@clean-rn/ddd';
import {
  User,
  IUserErrorCodes,
  IUserErrorMessage,
  ISearchEmailQuery,
  ISearchPhoneQuery,
  IValidatePhoneQuery,
  IRegisterIdentityCommand,
  IRegisterPasswordCommand,
  IRegisterBirthCommand,
  IRegisterAddressCommand,
  ISignupUserCommand,
} from '@clean-rn/user/domain';

export enum IUserTypes {
  // commands
  FETCH_SEARCH_EMAIL = 'FETCH_SEARCH_EMAIL',
  REGISTER_IDENTITY = 'REGISTER_IDENTITY',
  REGISTER_PASSWORD = 'REGISTER_PASSWORD',
  FETCH_SEARCH_PHONE = 'FETCH_SEARCH_PHONE',
  FETCH_VALIDATE_PHONE = 'FETCH_VALIDATE_PHONE',
  REGISTER_BIRTH = 'REGISTER_BIRTH',
  REGISTER_ADDRESS = 'REGISTER_ADDRESS',
  FETCH_SIGNUP_USER = 'FETCH_SIGNUP_USER',
  INITIALIZE_SIGNUP_STEP = 'INITIALIZE_SIGNUP_STEP',
  // domain events
  EMAIL_NOT_FOUND = 'EMAIL_NOT_FOUND',
  SIGNUP_FAILED = 'SIGNUP_FAILED',
  IDENTITY_REGISTERED = 'IDENTITY_REGISTERED',
  PASSWORD_REGISTERED = 'PASSWORD_REGISTERED',
  PHONE_NOT_FOUND = 'PHONE_NOT_FOUND',
  PHONE_CODE_SENT = 'PHONE_CODE_SENT',
  PHONE_VALIDATED = 'PHONE_VALIDATED',
  BIRTH_REGISTERED = 'BIRTH_REGISTERED',
  ADDRESS_REGISTERED = 'ADDRESS_REGISTERED',
  USER_SIGNED_UP = 'USER_SIGNED_UP',
}

// commands
export type IFetchSearchEmail = {
  type: typeof IUserTypes.FETCH_SEARCH_EMAIL;
  payload: ISearchEmailQuery;
};

export type IRegisterIdentity = {
  type: typeof IUserTypes.REGISTER_IDENTITY;
  payload: IRegisterIdentityCommand;
};

export type IRegisterPassword = {
  type: typeof IUserTypes.REGISTER_PASSWORD;
  payload: IRegisterPasswordCommand;
};

export type IFetchSearchPhone = {
  type: typeof IUserTypes.FETCH_SEARCH_PHONE;
  payload: ISearchPhoneQuery;
};

export type IFetchValidatePhone = {
  type: typeof IUserTypes.FETCH_VALIDATE_PHONE;
  payload: IValidatePhoneQuery;
};

export type IRegisterBirth = {
  type: typeof IUserTypes.REGISTER_BIRTH;
  payload: IRegisterBirthCommand;
};

export type IRegisterAddress = {
  type: typeof IUserTypes.REGISTER_ADDRESS;
  payload: IRegisterAddressCommand;
};

export type IFetchSignupUser = {
  type: typeof IUserTypes.FETCH_SIGNUP_USER;
  payload: ISignupUserCommand;
};

export type IInitializeSignupStep = {
  type: typeof IUserTypes.INITIALIZE_SIGNUP_STEP;
};

// domainEvents
export type IEmailNotFound = {
  type: typeof IUserTypes.EMAIL_NOT_FOUND;
};

export type ISignupFailed = {
  type: typeof IUserTypes.SIGNUP_FAILED;
  payload: IDomainError<IUserErrorCodes, IUserErrorMessage>;
};

export type IIdentityRegistered = {
  type: typeof IUserTypes.IDENTITY_REGISTERED;
  payload: User;
};

export type IPasswordRegistered = {
  type: typeof IUserTypes.PASSWORD_REGISTERED;
  payload: User;
};

export type IPhoneNotFound = {
  type: typeof IUserTypes.PHONE_NOT_FOUND;
  payload: IDomainError<IUserErrorCodes, IUserErrorMessage>;
};

export type IPhoneCodeSent = {
  type: typeof IUserTypes.PHONE_CODE_SENT;
};

export type IPhoneValidated = {
  type: typeof IUserTypes.PHONE_VALIDATED;
  payload: User;
};

export type IBirthRegistered = {
  type: typeof IUserTypes.BIRTH_REGISTERED;
  payload: User;
};

export type IAddressRegistered = {
  type: typeof IUserTypes.ADDRESS_REGISTERED;
  payload: User;
};

export type IUserSignedUp = {
  type: typeof IUserTypes.USER_SIGNED_UP;
  payload: User;
};

export type IUserActions =
  | IInitializeSignupStep
  | IFetchSearchEmail
  | IEmailNotFound
  | ISignupFailed
  | IIdentityRegistered
  | IPasswordRegistered
  | IFetchSearchPhone
  | IPhoneNotFound
  | IPhoneCodeSent
  | IFetchValidatePhone
  | IPhoneValidated
  | IBirthRegistered
  | IAddressRegistered
  | IFetchSignupUser
  | IUserSignedUp;
