import {
  IAuthErrorCodes,
  IAuthErrorMessage,
  ICheckEmailQuery,
  ICheckPhoneQuery,
  IRegisterAddressCommand,
  IRegisterBirthCommand,
  IRegisterIdentityCommand,
  IRegisterPasswordCommand,
  ISignupUserCommand,
  IValidatePhoneQuery,
  PhoneOtp,
  User,
} from '@clean-rn/auth/domain';
import {
  ISignupActions,
  ISignupTypes,
  ISignupFailed,
  IRegisterIdentity,
  IRegisterBirth,
  IRegisterPassword,
  IRegisterAddress,
  IIdentityRegistered,
  IBirthRegistered,
  IAddressRegistered,
  IEmailChecked,
  IPasswordRegistered,
  IFetchCheckEmailExists,
  IFetchCheckPhone,
  IFetchValidatePhone,
  IPhoneChecked,
  IPhoneValidated,
  IFetchSignupUser,
  IUserSignedUp,
} from './types';
import { IDomainError } from '@clean-rn/ddd';

// redux actions that are commands
export const fetchCheckEmailExists = (payload: ICheckEmailQuery): IFetchCheckEmailExists => ({
  type: ISignupTypes.FETCH_CHECK_EMAIL_EXISTS,
  payload,
});

export const registerIdentity = (payload: IRegisterIdentityCommand): IRegisterIdentity => ({
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

// redux actions that are domain Events
export const emailChecked = (): IEmailChecked => ({
  type: ISignupTypes.EMAIL_CHECKED,
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

export const fetchCheckPhone = (payload: ICheckPhoneQuery): IFetchCheckPhone => ({
  type: ISignupTypes.FETCH_CHECK_PHONE,
  payload,
});

export const phoneChecked = (): IPhoneChecked => ({
  type: ISignupTypes.PHONE_CHECKED,
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
