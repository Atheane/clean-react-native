import {
  User,
  IAuthErrorCodes,
  IAuthErrorMessage,
  ICheckEmailQuery,
  ICheckPhoneQuery,
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
  FETCH_CHECK_EMAIL_EXISTS = 'FETCH_CHECK_EMAIL_EXISTS',
  REGISTER_IDENTITY = 'REGISTER_IDENTITY',
  REGISTER_PASSWORD = 'REGISTER_PASSWORD',
  FETCH_VALIDATE_PHONE = 'FETCH_VALIDATE_PHONE',
  REGISTER_BIRTH = 'REGISTER_BIRTH',
  REGISTER_ADDRESS = 'REGISTER_ADDRESS',
  FETCH_SIGNUP_USER = 'FETCH_SIGNUP_USER',
  INITIALIZE_SIGNUP_STEP = 'INITIALIZE_SIGNUP_STEP',
  // domain events
  EMAIL_CHECKED = 'EMAIL_CHECKED',
  SIGNUP_FAILED = 'SIGNUP_FAILED',
  IDENTITY_REGISTERED = 'IDENTITY_REGISTERED',
  PASSWORD_REGISTERED = 'PASSWORD_REGISTERED',
  FETCH_CHECK_PHONE = 'FETCH_CHECK_PHONE',
  PHONE_CHECKED = 'PHONE_CHECKED',
  PHONE_VALIDATED = 'PHONE_VALIDATED',
  BIRTH_REGISTERED = 'BIRTH_REGISTERED',
  ADDRESS_REGISTERED = 'ADDRESS_REGISTERED',
  USER_SIGNED_UP = 'USER_SIGNED_UP',
}

// commands
export type IFetchCheckEmailExists = {
  type: typeof ISignupTypes.FETCH_CHECK_EMAIL_EXISTS;
  payload: ICheckEmailQuery;
};

export type IRegisterIdentity = {
  type: typeof ISignupTypes.REGISTER_IDENTITY;
  payload: IRegisterIdentityCommand;
};

export type IRegisterPassword = {
  type: typeof ISignupTypes.REGISTER_PASSWORD;
  payload: IRegisterPasswordCommand;
};

export type IFetchCheckPhone = {
  type: typeof ISignupTypes.FETCH_CHECK_PHONE;
  payload: ICheckPhoneQuery;
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
export type IEmailChecked = {
  type: typeof ISignupTypes.EMAIL_CHECKED;
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

export type IPhoneChecked = {
  type: typeof ISignupTypes.PHONE_CHECKED;
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
  | IFetchCheckEmailExists
  | IEmailChecked
  | ISignupFailed
  | IIdentityRegistered
  | IPasswordRegistered
  | IFetchCheckPhone
  | IPhoneChecked
  | IFetchValidatePhone
  | IPhoneValidated
  | IBirthRegistered
  | IAddressRegistered
  | IFetchSignupUser
  | IUserSignedUp;
