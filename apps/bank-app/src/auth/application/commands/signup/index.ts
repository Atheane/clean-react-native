import {
  IAuthErrorCodes,
  IAuthErrorMessage,
  ISearchEmailQuery,
  ISearchPhoneQuery,
  IRegisterAddressCommand,
  IRegisterBirthCommand,
  IRegisterIdentityCommand,
  IRegisterPasswordCommand,
  IValidatePhoneQuery,
  Email,
  User,
  ISignupUserCommand,
} from '@clean-rn/auth/domain';
import {
  ISignupActions,
  ISignupTypes,
  ISignupFailed,
  IRegisterIdentity,
  IRegisterBirth,
  IRegisterPassword,
  IRegisterAddress,
  IInitializeSignupStep,
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
} from './types';
import { IDomainError } from '@clean-rn/ddd';

// redux actions that are commands
export const fetchSearchEmail = (payload: ISearchEmailQuery): IFetchSearchEmail => ({
  type: ISignupTypes.FETCH_SEARCH_EMAIL,
  payload,
});

export const registerIdentity = (
  payload: IRegisterIdentityCommand & { email: Email },
): IRegisterIdentity => ({
  type: ISignupTypes.REGISTER_IDENTITY,
  payload,
});

export const registerPassword = (payload: IRegisterPasswordCommand): IRegisterPassword => ({
  type: ISignupTypes.REGISTER_PASSWORD,
  payload,
});

export const registerBirth = (payload: IRegisterBirthCommand): IRegisterBirth => ({
  type: ISignupTypes.REGISTER_BIRTH,
  payload,
});

export const registerAddress = (payload: IRegisterAddressCommand): IRegisterAddress => ({
  type: ISignupTypes.REGISTER_ADDRESS,
  payload,
});

export const fetchSignupUser = (payload: ISignupUserCommand): IFetchSignupUser => ({
  type: ISignupTypes.FETCH_SIGNUP_USER,
  payload,
});

export const initializeSignupStep = (): IInitializeSignupStep => ({
  type: ISignupTypes.INITIALIZE_SIGNUP_STEP,
});

// redux actions that are domain Events
export const emailNotFound = (): IEmailNotFound => ({
  type: ISignupTypes.EMAIL_NOT_FOUND,
});

export const signupFailed = (payload: IDomainError<IAuthErrorCodes, IAuthErrorMessage>): ISignupFailed => ({
  type: ISignupTypes.SIGNUP_FAILED,
  payload,
});

export const identityRegistered = (payload: User): IIdentityRegistered => ({
  type: ISignupTypes.IDENTITY_REGISTERED,
  payload,
});

export const passwordRegistered = (payload: User): IPasswordRegistered => ({
  type: ISignupTypes.PASSWORD_REGISTERED,
  payload,
});

export const birthRegistered = (payload: User): IBirthRegistered => ({
  type: ISignupTypes.BIRTH_REGISTERED,
  payload,
});

export const addressRegistered = (payload: User): IAddressRegistered => ({
  type: ISignupTypes.ADDRESS_REGISTERED,
  payload,
});

export const fetchSearchPhone = (payload: ISearchPhoneQuery): IFetchSearchPhone => ({
  type: ISignupTypes.FETCH_SEARCH_PHONE,
  payload,
});

export const phoneCodeSent = (): IPhoneCodeSent => ({
  type: ISignupTypes.PHONE_CODE_SENT,
});

export const phoneNotFound = (payload: IDomainError<IAuthErrorCodes, IAuthErrorMessage>): IPhoneNotFound => ({
  type: ISignupTypes.PHONE_NOT_FOUND,
  payload,
});

export const fetchValidatePhone = (payload: IValidatePhoneQuery): IFetchValidatePhone => ({
  type: ISignupTypes.FETCH_VALIDATE_PHONE,
  payload,
});

export const phoneValidated = (prospect: User): IPhoneValidated => ({
  type: ISignupTypes.PHONE_VALIDATED,
  payload: prospect,
});

export const userSignedUp = (user: User): IUserSignedUp => ({
  type: ISignupTypes.USER_SIGNED_UP,
  payload: user,
});

export { ISignupTypes, ISignupActions };
