import { IContactErrorCodes, IContactErrorMessage } from '@clean-rn/contact/domain';
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
  IUpdateUserConfigCommand,
  IUpdateUserCommand,
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
  FETCH_UPDATE_NOTIFICATIONS = 'FETCH_UPDATE_NOTIFICATIONS',
  FETCH_DELETE_USER_ACCOUNT = 'FETCH_DELETE_USER_ACCOUNT',
  INITIALIZE_USER = 'INITIALIZE_USER',
  RESET_ERROR = 'RESET_ERROR',
  FETCH_UPDATE_LANGUAGE = 'FETCH_UPDATE_LANGUAGE',
  FETCH_UPDATE_USER = 'FETCH_UPDATE_USER',
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
  NOTIFICATIONS_UPDATED = 'NOTIFICATIONS_UPDATED',
  LANGUAGE_UPDATED = 'LANGUAGE_UPDATED',
  USER_SAVED = 'USER_SAVED',
  USER_UPDATED = 'USER_UPDATED',
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

export type IFetchUpdateNotifications = {
  type: typeof IUserTypes.FETCH_UPDATE_NOTIFICATIONS;
  payload: IUpdateUserConfigCommand;
};

export type IFetchDeleteUserAccount = {
  type: typeof IUserTypes.FETCH_DELETE_USER_ACCOUNT;
};

export type IInitializeUser = {
  type: typeof IUserTypes.INITIALIZE_USER;
};

export type IResetError = {
  type: typeof IUserTypes.RESET_ERROR;
};

export type IFetchUpdateLanguage = {
  type: typeof IUserTypes.FETCH_UPDATE_LANGUAGE;
  payload: IUpdateUserConfigCommand;
};

export type IFetchUpdateUser = {
  type: typeof IUserTypes.FETCH_UPDATE_USER;
  payload: IUpdateUserCommand;
};

// domainEvents
export type IEmailNotFound = {
  type: typeof IUserTypes.EMAIL_NOT_FOUND;
};

export type ISignupFailed = {
  type: typeof IUserTypes.SIGNUP_FAILED;
  payload: IDomainError<IUserErrorCodes | IContactErrorCodes, IUserErrorMessage | IContactErrorMessage>;
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

export type INotificationsUpdated = {
  type: typeof IUserTypes.NOTIFICATIONS_UPDATED;
  payload: {
    user: User;
  };
};

export type ILanguageUpdated = {
  type: typeof IUserTypes.LANGUAGE_UPDATED;
  payload: {
    user: User;
  };
};

export type IUserSaved = {
  type: typeof IUserTypes.USER_SAVED;
  payload: User;
};

export type IUserUpdated = {
  type: typeof IUserTypes.USER_UPDATED;
  payload: User;
};

export type IUserActions =
  | IInitializeUser
  | IFetchSearchEmail
  | IEmailNotFound
  | ISignupFailed
  | IIdentityRegistered
  | IPasswordRegistered
  | IFetchSearchPhone
  | IFetchDeleteUserAccount
  | IPhoneNotFound
  | IPhoneCodeSent
  | IFetchValidatePhone
  | IFetchUpdateNotifications
  | IFetchUpdateLanguage
  | IPhoneValidated
  | IBirthRegistered
  | IAddressRegistered
  | IFetchSignupUser
  | IUserSignedUp
  | INotificationsUpdated
  | ILanguageUpdated
  | IUserSaved
  | IResetError
  | IFetchUpdateUser
  | IUserUpdated;
