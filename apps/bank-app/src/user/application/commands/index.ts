import { IDomainError } from '@clean-rn/ddd';
import { Email } from '@clean-rn/auth/domain';
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
} from '@clean-rn/user/domain';
import {
  IUserActions,
  IUserTypes,
  ISignupFailed,
  IRegisterIdentity,
  IRegisterBirth,
  IRegisterPassword,
  IRegisterAddress,
  IInitializeUser,
  IIdentityRegistered,
  IBirthRegistered,
  IAddressRegistered,
  IEmailNotFound,
  IPasswordRegistered,
  IFetchSearchEmail,
  IFetchSearchPhone,
  IFetchValidatePhone,
  IPhoneNotFound,
  IPhoneValidated,
  IFetchSignupUser,
  IUserSignedUp,
  IPhoneCodeSent,
  IFetchUpdateNotifications,
  IFetchUpdateLanguage,
  INotificationsUpdated,
  IUserSaved,
  IFetchDeleteUserAccount,
  IResetError,
  ILanguageUpdated,
} from './types';
import { IContactErrorCodes, IContactErrorMessage } from '@clean-rn/contact/domain';

// redux actions that are commands
export const fetchSearchEmail = (payload: ISearchEmailQuery): IFetchSearchEmail => ({
  type: IUserTypes.FETCH_SEARCH_EMAIL,
  payload,
});

export const registerIdentity = (
  payload: IRegisterIdentityCommand & { email: Email },
): IRegisterIdentity => ({
  type: IUserTypes.REGISTER_IDENTITY,
  payload,
});

export const registerPassword = (payload: IRegisterPasswordCommand): IRegisterPassword => ({
  type: IUserTypes.REGISTER_PASSWORD,
  payload,
});

export const registerBirth = (payload: IRegisterBirthCommand): IRegisterBirth => ({
  type: IUserTypes.REGISTER_BIRTH,
  payload,
});

export const registerAddress = (payload: IRegisterAddressCommand): IRegisterAddress => ({
  type: IUserTypes.REGISTER_ADDRESS,
  payload,
});

export const fetchSignupUser = (payload: ISignupUserCommand): IFetchSignupUser => ({
  type: IUserTypes.FETCH_SIGNUP_USER,
  payload,
});

export const fetchUpdateNotifications = (payload: IUpdateUserConfigCommand): IFetchUpdateNotifications => ({
  type: IUserTypes.FETCH_UPDATE_NOTIFICATIONS,
  payload,
});

export const fetchDeleteUserAccount = (): IFetchDeleteUserAccount => ({
  type: IUserTypes.FETCH_DELETE_USER_ACCOUNT,
});

export const initializeUser = (): IInitializeUser => ({
  type: IUserTypes.INITIALIZE_USER,
});

export const resetError = (): IResetError => ({
  type: IUserTypes.RESET_ERROR,
});

export const fetchUpdateLanguage = (payload: IUpdateUserConfigCommand): IFetchUpdateLanguage => ({
  type: IUserTypes.FETCH_UPDATE_LANGUAGE,
  payload,
});

// redux actions that are domain Events
export const emailNotFound = (): IEmailNotFound => ({
  type: IUserTypes.EMAIL_NOT_FOUND,
});

export const signupFailed = (
  payload: IDomainError<IUserErrorCodes | IContactErrorCodes, IUserErrorMessage | IContactErrorMessage>,
): ISignupFailed => ({
  type: IUserTypes.SIGNUP_FAILED,
  payload,
});

export const identityRegistered = (payload: User): IIdentityRegistered => ({
  type: IUserTypes.IDENTITY_REGISTERED,
  payload,
});

export const passwordRegistered = (payload: User): IPasswordRegistered => ({
  type: IUserTypes.PASSWORD_REGISTERED,
  payload,
});

export const birthRegistered = (payload: User): IBirthRegistered => ({
  type: IUserTypes.BIRTH_REGISTERED,
  payload,
});

export const addressRegistered = (payload: User): IAddressRegistered => ({
  type: IUserTypes.ADDRESS_REGISTERED,
  payload,
});

export const fetchSearchPhone = (payload: ISearchPhoneQuery): IFetchSearchPhone => ({
  type: IUserTypes.FETCH_SEARCH_PHONE,
  payload,
});

export const phoneCodeSent = (): IPhoneCodeSent => ({
  type: IUserTypes.PHONE_CODE_SENT,
});

export const phoneNotFound = (payload: IDomainError<IUserErrorCodes, IUserErrorMessage>): IPhoneNotFound => ({
  type: IUserTypes.PHONE_NOT_FOUND,
  payload,
});

export const fetchValidatePhone = (payload: IValidatePhoneQuery): IFetchValidatePhone => ({
  type: IUserTypes.FETCH_VALIDATE_PHONE,
  payload,
});

export const phoneValidated = (prospect: User): IPhoneValidated => ({
  type: IUserTypes.PHONE_VALIDATED,
  payload: prospect,
});

export const userSignedUp = (user: User): IUserSignedUp => ({
  type: IUserTypes.USER_SIGNED_UP,
  payload: user,
});

export const notificationUpdated = (payload: { user: User }): INotificationsUpdated => ({
  type: IUserTypes.NOTIFICATIONS_UPDATED,
  payload,
});

export const userSaved = (payload: User): IUserSaved => ({
  type: IUserTypes.USER_SAVED,
  payload,
});

export const languageUpdated = (payload: { user: User }): ILanguageUpdated => ({
  type: IUserTypes.LANGUAGE_UPDATED,
  payload,
});

export { IUserTypes, IUserActions };
