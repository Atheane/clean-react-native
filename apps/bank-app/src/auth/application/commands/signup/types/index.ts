import {
  User,
  IAuthErrorCodes,
  IAuthErrorMessage,
  ISearchEmailQuery,
  ISearchPhoneQuery,
  IValidatePhoneQuery,
  IRegisterIdentityCommand,
  IRegisterPasswordCommand,
  IRegisterBirthCommand,
  IRegisterAddressCommand,
  ISignupUserCommand,
} from '@clean-rn/auth/domain';
import { IDomainError } from '@clean-rn/ddd';

export enum ISignupTypes {
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
  PHONE_VALIDATED = 'PHONE_VALIDATED',
  BIRTH_REGISTERED = 'BIRTH_REGISTERED',
  ADDRESS_REGISTERED = 'ADDRESS_REGISTERED',
  USER_SIGNED_UP = 'USER_SIGNED_UP',
}

// commands
export type IFetchSearchEmail = {
  type: typeof ISignupTypes.FETCH_SEARCH_EMAIL;
  payload: ISearchEmailQuery;
};

export type IRegisterIdentity = {
  type: typeof ISignupTypes.REGISTER_IDENTITY;
  payload: IRegisterIdentityCommand;
};

export type IRegisterPassword = {
  type: typeof ISignupTypes.REGISTER_PASSWORD;
  payload: IRegisterPasswordCommand;
};

export type IFetchSearchPhone = {
  type: typeof ISignupTypes.FETCH_SEARCH_PHONE;
  payload: ISearchPhoneQuery;
};

export type IFetchValidatePhone = {
  type: typeof ISignupTypes.FETCH_VALIDATE_PHONE;
  payload: IValidatePhoneQuery;
};

export type IRegisterBirth = {
  type: typeof ISignupTypes.REGISTER_BIRTH;
  payload: IRegisterBirthCommand;
};

export type IRegisterAddress = {
  type: typeof ISignupTypes.REGISTER_ADDRESS;
  payload: IRegisterAddressCommand;
};

export type IFetchSignupUser = {
  type: typeof ISignupTypes.FETCH_SIGNUP_USER;
  payload: ISignupUserCommand;
};

export type IInitializeSignupStep = {
  type: typeof ISignupTypes.INITIALIZE_SIGNUP_STEP;
};

// domainEvents
export type IEmailNotFound = {
  type: typeof ISignupTypes.EMAIL_NOT_FOUND;
};

export type ISignupFailed = {
  type: typeof ISignupTypes.SIGNUP_FAILED;
  payload: IDomainError<IAuthErrorCodes, IAuthErrorMessage>;
};

export type IIdentityRegistered = {
  type: typeof ISignupTypes.IDENTITY_REGISTERED;
  payload: User;
};

export type IPasswordRegistered = {
  type: typeof ISignupTypes.PASSWORD_REGISTERED;
  payload: User;
};

export type IPhoneNotFound = {
  type: typeof ISignupTypes.PHONE_NOT_FOUND;
};

export type IPhoneValidated = {
  type: typeof ISignupTypes.PHONE_VALIDATED;
  payload: User;
};

export type IBirthRegistered = {
  type: typeof ISignupTypes.BIRTH_REGISTERED;
  payload: User;
};

export type IAddressRegistered = {
  type: typeof ISignupTypes.ADDRESS_REGISTERED;
  payload: User;
};

export type IUserSignedUp = {
  type: typeof ISignupTypes.USER_SIGNED_UP;
  payload: User;
};

export type ISignupActions =
  | IInitializeSignupStep
  | IFetchSearchEmail
  | IEmailNotFound
  | ISignupFailed
  | IIdentityRegistered
  | IPasswordRegistered
  | IFetchSearchPhone
  | IPhoneNotFound
  | IFetchValidatePhone
  | IPhoneValidated
  | IBirthRegistered
  | IAddressRegistered
  | IFetchSignupUser
  | IUserSignedUp;
