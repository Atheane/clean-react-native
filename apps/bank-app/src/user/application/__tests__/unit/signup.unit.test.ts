import { SelectEffectDescriptor, SimpleEffect, takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import Constants from 'expo-constants';
import dayjs from 'dayjs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthError, Email, IAuth, Password } from '@clean-rn/auth/domain';
import { ContactError, Phone } from '@clean-rn/contact/domain';
import {
  IGender,
  IRegisterIdentityCommand,
  ISuccess,
  IRegisterPasswordCommand,
  IRegisterBirthCommand,
  IRegisterAddressCommand,
  UserError,
  PhoneOtp,
  User,
  IUserProperties,
} from '@clean-rn/user/domain';
import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { IUserSearchServerCode, UserApi } from '@clean-rn/user/infrastructure';
import { AuthApi } from '@clean-rn/auth/infrastructure';

import {
  checkEmailGenerator,
  checkEmailSaga,
  registerIdentityGenerator,
  registerIdentitySaga,
  checkPhoneGenerator,
  checkPhoneSaga,
  registerPasswordGenerator,
  registerPasswordSaga,
  registerBirthGenerator,
  registerBirthSaga,
  registerAddressSaga,
  registerAddressGenerator,
  validatePhoneGenerator,
  validatePhoneSaga,
  signupUserSaga,
  signupUserGenerator,
} from '../../usecases';
import { selectUser, selectEmail, selectPhoneOtp } from '../../state-management/selectors';

import {
  IUserTypes,
  addressRegistered,
  birthRegistered,
  emailNotFound,
  identityRegistered,
  passwordRegistered,
  phoneValidated,
  signupFailed,
  userSignedUp,
  fetchSignupUser,
  initializeUser,
  phoneCodeSent,
} from '../../commands';
import { IStoreKey } from '../../../../shared/application/types';
import { loadStorage } from '../../../../shared/application/commands/initialize-application';
import { IAuthStackPages, IUserStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import {
  selectPassword,
  selectEmail as selectEmailFromAuth,
} from '../../../../auth/application/state-management/selectors';
import { loginSuccess } from '../../../../auth/application/commands';

import { checkCustomerStatus } from '../../../../kyc/application/commands/customer';

describe('Signup - usecase', () => {
  const httpConnection = HttpConnection.getInstance(Constants.expoConfig?.extra?.BASE_URL_API);
  const userApi = UserApi.getInstance(httpConnection);
  const authApi = AuthApi.getInstance(httpConnection);

  const mockIdentity: IRegisterIdentityCommand = {
    gender: IGender.MAN,
    firstName: 'John',
    lastName: 'Smith',
  };

  const mockPassword: IRegisterPasswordCommand = {
    password: 'azekpoakz',
  };

  const mockBirth: IRegisterBirthCommand = {
    birthday: dayjs('1980-01-01'),
    birthCountry: 'FR',
    nationality: 'FR',
  };

  const mockAddress: IRegisterAddressCommand = {
    str: 'fake address',
    city: 'string',
    zip: 'string',
    country: 'GR',
    USPerson: false,
  };

  const mockQueryEmail = {
    email: new Email('test@example.com'),
  };

  const mockQueryPhone = {
    phone: new Phone('0616804613', 'FR'),
  };

  const mockQueryPhoneOtp = {
    phoneOtp: new PhoneOtp('123456'),
    phone: new Phone('0616804613', 'FR'),
  };

  const mockSuccessTrue: ISuccess = {
    success: true,
  };

  const mockSuccessFalse: ISuccess = {
    success: false,
  };

  const mockAuth: IAuth = {
    accessToken: 'fake-access-token',
    refreshToken: 'fake-refresh-token',
  };

  const mockError400 = {
    statusCode: 400,
    message: 'Bad Request Exception',
    response: {
      message: ['phone must be a phone number'],
      error: 'Bad Request',
      statusCode: 400,
    },
    timestamp: '2023-12-18T17:29:21.281Z',
    path: '/app/user/search?phone=3197010517282',
    method: 'GET',
  };

  const mockError500 = {
    message: 'Core::AuthService::Auth - Server Error',
    statusCode: 500,
    response: 'Core::AuthService::Auth - Server Error',
    timestamp: '2023-04-07T15:28:04.657Z',
    path: '/auth/login',
  };

  it('should wait for FETCH_SEARCH_EMAIL action and call checkEmailApiSaga, should be done on next iteration', () => {
    const genObject = checkEmailSaga(httpConnection);

    expect(genObject.next().value).toEqual(
      takeEvery(IUserTypes.FETCH_SEARCH_EMAIL, checkEmailGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('should wait for REGISTER_IDENTITY action and call registerIdentityGenerator, should be done on next iteration', () => {
    const genObject = registerIdentitySaga();

    expect(genObject.next().value).toEqual(
      takeEvery(IUserTypes.REGISTER_IDENTITY, registerIdentityGenerator),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('should wait for REGISTER_PASSWORD action and call registerPasswordGenerator, should be done on next iteration', () => {
    const genObject = registerPasswordSaga();

    expect(genObject.next().value).toEqual(
      takeEvery(IUserTypes.REGISTER_PASSWORD, registerPasswordGenerator),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('should wait for FETCH_SEARCH_PHONE action and call checkPhoneGenerator, should be done on next iteration', () => {
    const genObject = checkPhoneSaga(httpConnection);

    expect(genObject.next().value).toEqual(
      takeEvery(IUserTypes.FETCH_SEARCH_PHONE, checkPhoneGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('should wait for FETCH_VALIDATE_PHONE action and call validatePhoneGenerator, should be done on next iteration', () => {
    const genObject = validatePhoneSaga(httpConnection);

    expect(genObject.next().value).toEqual(
      takeEvery(IUserTypes.FETCH_VALIDATE_PHONE, validatePhoneGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('should wait for REGISTER_BIRTH action and call registerBirthGenerator, should be done on next iteration', () => {
    const genObject = registerBirthSaga();

    expect(genObject.next().value).toEqual(takeEvery(IUserTypes.REGISTER_BIRTH, registerBirthGenerator));
    expect(genObject.next().done).toBeTruthy();
  });

  it('should wait for REGISTER_ADDRESS action and call registerAddressGenerator, should be done on next iteration', () => {
    const genObject = registerAddressSaga();

    expect(genObject.next().value).toEqual(takeEvery(IUserTypes.REGISTER_ADDRESS, registerAddressGenerator));
    expect(genObject.next().done).toBeTruthy();
  });

  it('should wait for FETCH_SIGNUP_USER action and call signupUserGenerator, should be done on next iteration', () => {
    const genObject = signupUserSaga(httpConnection);

    expect(genObject.next().value).toEqual(
      takeEvery(IUserTypes.FETCH_SIGNUP_USER, signupUserGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('should call emailNotFound actions if email does not exists', () => {
    const mockQueryEmail = {
      email: new Email('test@example.com'),
    };

    testSaga(checkEmailGenerator, httpConnection, {
      type: IUserTypes.FETCH_SEARCH_EMAIL,
      payload: mockQueryEmail,
    })
      .next()
      .call([userApi, userApi.searchEmail], mockQueryEmail)
      .next(IUserSearchServerCode.NOT_FOUND)
      .put(emailNotFound())
      .next();
  });

  it('should throw SignupFailureEmailExists if email exists', () => {
    testSaga(checkEmailGenerator, httpConnection, {
      type: IUserTypes.FETCH_SEARCH_EMAIL,
      payload: mockQueryEmail,
    })
      .next()
      .call([userApi, userApi.searchEmail], mockQueryEmail)
      .next(IUserSearchServerCode.EMAIL_EXISTS)
      .put(signupFailed(new UserError.SignupFailureEmailExists()))
      .next()
      .call(AsyncStorage.setItem, IStoreKey.USER_EMAIL, mockQueryEmail.email.value)
      .next(mockQueryEmail.email.value)
      .put(loadStorage())
      .next(mockQueryEmail.email)
      .call(navigate, { route: IAuthStackPages.LOGIN })
      .next();
  });

  it('should throw SignupFailureEmailExists if email exists in old database', () => {
    testSaga(checkEmailGenerator, httpConnection, {
      type: IUserTypes.FETCH_SEARCH_EMAIL,
      payload: mockQueryEmail,
    })
      .next()
      .call([userApi, userApi.searchEmail], mockQueryEmail)
      .next(IUserSearchServerCode.KELVIN_USER)
      .put(signupFailed(new UserError.SignupFailureEmailExists()))
      .next()
      .call(AsyncStorage.setItem, IStoreKey.USER_EMAIL, mockQueryEmail.email.value)
      .next(mockQueryEmail.email.value)
      .put(loadStorage())
      .next(mockQueryEmail.email)
      .call(navigate, { route: IUserStackPages.EMAIL_SENT })
      .next();
  });

  it('Should call showUnknownError action if 500 when fetchSearchEmail', () => {
    testSaga(checkEmailGenerator, httpConnection, {
      type: IUserTypes.FETCH_SEARCH_EMAIL,
      payload: mockQueryEmail,
    })
      .next()
      .call([userApi, userApi.searchEmail], mockQueryEmail)
      .next()
      .throw(new ServerError(mockError500))
      .put(initializeUser())
      .next()
      .put(showUnknownError(new ServerError(mockError500)))
      .next();
  });

  it('should call registerIdentity actions', () => {
    const user = User.CreateFromEmail(new Email('test@example.com'));
    user.registerIdentity(mockIdentity);

    testSaga(registerIdentityGenerator, {
      type: IUserTypes.REGISTER_IDENTITY,
      payload: { email: new Email('test@example.com'), ...mockIdentity },
    })
      .next()
      .put(identityRegistered(user))
      .next();
  });

  it('Should call showUnknownError action if unknown error when registerIdentity', () => {
    const user = User.CreateFromEmail(new Email('test@example.com'));
    user.registerIdentity(mockIdentity);

    testSaga(registerIdentityGenerator, {
      type: IUserTypes.REGISTER_IDENTITY,
      payload: { email: new Email('test@example.com'), ...mockIdentity },
    })
      .next()
      .throw(new Error('unknown error'))
      .put(initializeUser())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });

  it('should call registerPassword actions', () => {
    const userPrev = User.CreateFromEmail(new Email('test@example.com'));
    const user = User.CreateFromEmail(new Email('test@example.com'));
    user.registerPassword(mockPassword.password);
    testSaga(registerPasswordGenerator, {
      type: IUserTypes.REGISTER_PASSWORD,
      payload: mockPassword,
    })
      .next()
      .inspect<SimpleEffect<'SELECT', SelectEffectDescriptor>>((yieldedValue) => {
        expect(yieldedValue.type).toEqual('SELECT');
        expect(yieldedValue).toEqual(
          expect.objectContaining({
            type: 'SELECT',
            payload: expect.objectContaining({
              selector: selectUser,
            }),
          }),
        );
      })
      .next(userPrev)
      .put(passwordRegistered(user))
      .next(user);
  });

  it('should call registerPassword actions if user not in store', () => {
    const user = User.CreateFromEmail(new Email('test@example.com'));
    user.registerPassword(mockPassword.password);
    testSaga(registerPasswordGenerator, {
      type: IUserTypes.REGISTER_PASSWORD,
      payload: mockPassword,
    })
      .next()
      .inspect<SimpleEffect<'SELECT', SelectEffectDescriptor>>((yieldedValue) => {
        expect(yieldedValue.type).toEqual('SELECT');
        expect(yieldedValue).toEqual(
          expect.objectContaining({
            type: 'SELECT',
            payload: expect.objectContaining({
              selector: selectUser,
            }),
          }),
        );
      })
      .next(null)
      .inspect<SimpleEffect<'SELECT', SelectEffectDescriptor>>((yieldedValue) => {
        expect(yieldedValue.type).toEqual('SELECT');
        expect(yieldedValue).toEqual(
          expect.objectContaining({
            type: 'SELECT',
            payload: expect.objectContaining({
              selector: selectEmail,
            }),
          }),
        );
      })
      .next(new Email('test@example.com'))
      .put(passwordRegistered(user))
      .next(user);
  });

  it('Should call showUnknownError action if unknown error when registerPassword', () => {
    const user = User.CreateFromEmail(new Email('test@example.com'));
    user.registerPassword(mockPassword.password);
    testSaga(registerPasswordGenerator, {
      type: IUserTypes.REGISTER_PASSWORD,
      payload: mockPassword,
    })
      .next()
      .throw(new Error('unknown error'))
      .put(initializeUser())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });

  it('should call signupFailed action if phone exists', () => {
    testSaga(checkPhoneGenerator, httpConnection, {
      type: IUserTypes.FETCH_SEARCH_PHONE,
      payload: mockQueryPhone,
    })
      .next()
      .call([userApi, userApi.searchPhone], mockQueryPhone)
      .next(IUserSearchServerCode.PHONE_EXISTS)
      .put(signupFailed(new UserError.SignupFailurePhoneExists()))
      .next()
      .cancel();
  });

  it('should call phoneCodeSent action if phone not found', () => {
    testSaga(checkPhoneGenerator, httpConnection, {
      type: IUserTypes.FETCH_SEARCH_PHONE,
      payload: mockQueryPhone,
    })
      .next()
      .call([userApi, userApi.searchPhone], mockQueryPhone)
      .next(IUserSearchServerCode.NOT_FOUND)
      .call([userApi, userApi.sendPhoneValidation], mockQueryPhone)
      .next()
      .put(phoneCodeSent())
      .next()
      .call(navigate, { route: IUserStackPages.SIGNUP_VALIDATE_PHONE });
  });

  it('Should call signupFailed action if 400 when fetchSearchPhone', () => {
    testSaga(checkPhoneGenerator, httpConnection, {
      type: IUserTypes.FETCH_SEARCH_PHONE,
      payload: mockQueryPhone,
    })
      .next()
      .call([userApi, userApi.searchPhone], mockQueryPhone)
      .throw(new ServerError(mockError400))
      .put(signupFailed(new ContactError.InvalidPhone()))
      .next()
      .cancel();
  });

  it('Should call showUnknownError action if 500 when fetchSearchPhone', () => {
    testSaga(checkPhoneGenerator, httpConnection, {
      type: IUserTypes.FETCH_SEARCH_PHONE,
      payload: mockQueryPhone,
    })
      .next()
      .call([userApi, userApi.searchPhone], mockQueryPhone)
      .next()
      .throw(new ServerError(mockError500))
      .put(initializeUser())
      .next()
      .put(showUnknownError(new ServerError(mockError500)))
      .next();
  });

  it('Should call showUnknownError action if unknown error', () => {
    testSaga(checkPhoneGenerator, httpConnection, {
      type: IUserTypes.FETCH_SEARCH_PHONE,
      payload: mockQueryPhone,
    })
      .next()
      .call([userApi, userApi.searchPhone], mockQueryPhone)
      .next()
      .throw(new Error('unknown error'))
      .put(initializeUser())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });

  it('should call phoneValidated', () => {
    const userPrev = User.CreateFromEmail(new Email('test@example.com'));

    const user = User.CreateFromEmail(new Email('test@example.com'));
    user.validatePhone(mockQueryPhoneOtp);

    testSaga(validatePhoneGenerator, httpConnection, {
      type: IUserTypes.FETCH_VALIDATE_PHONE,
      payload: mockQueryPhoneOtp,
    })
      .next(mockQueryPhoneOtp)
      .call([userApi, userApi.checkPhoneValidation], mockQueryPhoneOtp)
      .next(mockSuccessTrue)
      .inspect<SimpleEffect<'SELECT', SelectEffectDescriptor>>((yieldedValue) => {
        expect(yieldedValue.type).toEqual('SELECT');
        expect(yieldedValue).toEqual(
          expect.objectContaining({
            type: 'SELECT',
            payload: expect.objectContaining({
              selector: selectUser,
            }),
          }),
        );
      })
      .next(userPrev)
      .put(phoneValidated(user))
      .next()
      .call(navigate, { route: IUserStackPages.SIGNUP_BIRTH })
      .next();
  });

  it('Check phone flow: should call phoneValidated is user not in store', () => {
    const user = User.CreateFromEmail(new Email('test@example.com'));
    user.validatePhone(mockQueryPhoneOtp);

    testSaga(validatePhoneGenerator, httpConnection, {
      type: IUserTypes.FETCH_VALIDATE_PHONE,
      payload: mockQueryPhoneOtp,
    })
      .next()
      .call([userApi, userApi.checkPhoneValidation], mockQueryPhoneOtp)
      .next(mockSuccessTrue)
      .select(selectUser)
      .next(null)
      .select(selectEmailFromAuth)
      .next(new Email('test@example.com'))
      .select(selectPassword)
      .next(new Password('test123'))
      .call([authApi, authApi.logPhone], {
        email: new Email('test@example.com'),
        password: new Password('test123'),
        phone: mockQueryPhoneOtp.phone,
      })
      .next(mockAuth)
      .call(httpConnection.attachBearerToken, mockAuth.accessToken)
      .next()
      .call([userApi, userApi.getUser])
      .next(user)
      .put(phoneValidated(user))
      .next()
      .call(navigate, { route: IUserStackPages.SIGNUP_CONGRATS })
      .next();
  });

  it('should call signupFailed action if otp incorrect', () => {
    const user = User.CreateFromEmail(new Email('test@example.com'));
    user.validatePhone(mockQueryPhoneOtp);

    testSaga(validatePhoneGenerator, httpConnection, {
      type: IUserTypes.SIGNUP_FAILED,
      payload: mockQueryPhoneOtp,
    })
      .next()
      .call([userApi, userApi.checkPhoneValidation], mockQueryPhoneOtp)
      .next(mockSuccessFalse)
      .put(signupFailed(new UserError.ValidatePhoneIncorrectPhoneCode()))
      .next()
      .cancel();
  });

  it('Should call showUnknownError action if unknown error when validatePhone', () => {
    const user = User.CreateFromEmail(new Email('test@example.com'));
    user.validatePhone(mockQueryPhoneOtp);

    testSaga(validatePhoneGenerator, httpConnection, {
      type: IUserTypes.SIGNUP_FAILED,
      payload: mockQueryPhoneOtp,
    })
      .next()
      .throw(new Error('unknown error'))
      .put(initializeUser())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });

  it('should call registerBirth actions', () => {
    const userPrev = User.CreateFromEmail(new Email('test@example.com'));
    const user = User.CreateFromEmail(new Email('test@example.com'));
    user.registerBirth(mockBirth);

    testSaga(registerBirthGenerator, {
      type: IUserTypes.REGISTER_BIRTH,
      payload: mockBirth,
    })
      .next()
      .inspect<SimpleEffect<'SELECT', SelectEffectDescriptor>>((yieldedValue) => {
        expect(yieldedValue.type).toEqual('SELECT');
        expect(yieldedValue).toEqual(
          expect.objectContaining({
            type: 'SELECT',
            payload: expect.objectContaining({
              selector: selectUser,
            }),
          }),
        );
      })
      .next(userPrev)
      .put(birthRegistered(user))
      .next()
      .call(navigate, { route: IUserStackPages.SIGNUP_ADDRESS })
      .next();
  });

  it('should call registerBirth actions if no user in store', () => {
    const user = User.CreateFromEmail(new Email('test@example.com'));
    user.registerBirth(mockBirth);

    testSaga(registerBirthGenerator, {
      type: IUserTypes.REGISTER_BIRTH,
      payload: mockBirth,
    })
      .next()
      .inspect<SimpleEffect<'SELECT', SelectEffectDescriptor>>((yieldedValue) => {
        expect(yieldedValue.type).toEqual('SELECT');
        expect(yieldedValue).toEqual(
          expect.objectContaining({
            type: 'SELECT',
            payload: expect.objectContaining({
              selector: selectUser,
            }),
          }),
        );
      })
      .next(null)
      .inspect<SimpleEffect<'SELECT', SelectEffectDescriptor>>((yieldedValue) => {
        expect(yieldedValue.type).toEqual('SELECT');
        expect(yieldedValue).toEqual(
          expect.objectContaining({
            type: 'SELECT',
            payload: expect.objectContaining({
              selector: selectEmail,
            }),
          }),
        );
      })
      .next(new Email('test@example.com'))
      .put(birthRegistered(user))
      .next();
  });

  it('Should call showUnknownError action if unknown error when registerBirth', () => {
    const user = User.CreateFromEmail(new Email('test@example.com'));
    user.registerBirth(mockBirth);

    testSaga(registerBirthGenerator, {
      type: IUserTypes.REGISTER_BIRTH,
      payload: mockBirth,
    })
      .next()
      .throw(new Error('unknown error'))
      .put(initializeUser())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });

  it('should call registerAddress actions if user exists', () => {
    const userPrev = User.CreateFromEmail(new Email('test@example.com'));
    const user = User.CreateFromEmail(new Email('test@example.com'));
    user.registerAddress(mockAddress);

    testSaga(registerAddressGenerator, {
      type: IUserTypes.REGISTER_ADDRESS,
      payload: mockAddress,
    })
      .next()
      .inspect<SimpleEffect<'SELECT', SelectEffectDescriptor>>((yieldedValue) => {
        expect(yieldedValue.type).toEqual('SELECT');
        expect(yieldedValue).toEqual(
          expect.objectContaining({
            type: 'SELECT',
            payload: expect.objectContaining({
              selector: selectUser,
            }),
          }),
        );
      })
      .next(userPrev)
      .put(addressRegistered(user))
      .next()
      .inspect<SimpleEffect<'SELECT', SelectEffectDescriptor>>((yieldedValue) => {
        expect(yieldedValue.type).toEqual('SELECT');
        expect(yieldedValue).toEqual(
          expect.objectContaining({
            type: 'SELECT',
            payload: expect.objectContaining({
              selector: selectPhoneOtp,
            }),
          }),
        );
      })
      .next(mockQueryPhoneOtp.phoneOtp)
      .put(fetchSignupUser({ user, phoneOtp: mockQueryPhoneOtp.phoneOtp }))
      .next(mockQueryPhoneOtp.phoneOtp);
  });

  it('should call registerAddress actions if no user', () => {
    const user = User.CreateFromEmail(new Email('test@example.com'));
    user.registerAddress(mockAddress);

    testSaga(registerAddressGenerator, {
      type: IUserTypes.REGISTER_ADDRESS,
      payload: { user, ...mockAddress },
    })
      .next()
      .inspect<SimpleEffect<'SELECT', SelectEffectDescriptor>>((yieldedValue) => {
        expect(yieldedValue.type).toEqual('SELECT');
        expect(yieldedValue).toEqual(
          expect.objectContaining({
            type: 'SELECT',
            payload: expect.objectContaining({
              selector: selectUser,
            }),
          }),
        );
      })
      .next(null)
      .inspect<SimpleEffect<'SELECT', SelectEffectDescriptor>>((yieldedValue) => {
        expect(yieldedValue.type).toEqual('SELECT');
        expect(yieldedValue).toEqual(
          expect.objectContaining({
            type: 'SELECT',
            payload: expect.objectContaining({
              selector: selectEmail,
            }),
          }),
        );
      })
      .next(new Email('test@example.com'))
      .put(addressRegistered(user))
      .next()
      .inspect<SimpleEffect<'SELECT', SelectEffectDescriptor>>((yieldedValue) => {
        expect(yieldedValue.type).toEqual('SELECT');
        expect(yieldedValue).toEqual(
          expect.objectContaining({
            type: 'SELECT',
            payload: expect.objectContaining({
              selector: selectPhoneOtp,
            }),
          }),
        );
      })
      .next(mockQueryPhoneOtp.phoneOtp)
      .put(fetchSignupUser({ user, phoneOtp: mockQueryPhoneOtp.phoneOtp }))
      .next(mockQueryPhoneOtp.phoneOtp);
  });

  it('Should call showUnknownError action if unknown error when registerAddress', () => {
    const user = User.CreateFromEmail(new Email('test@example.com'));

    testSaga(registerAddressGenerator, {
      type: IUserTypes.REGISTER_ADDRESS,
      payload: { user, ...mockAddress },
    })
      .next()
      .throw(new Error('unknown error'))
      .put(initializeUser())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });

  it('should call userSignedUp actions if user exists', () => {
    const userPrev = User.CreateFromEmail(new Email('test@example.com'));
    userPrev.registerIdentity(mockIdentity);
    userPrev.registerPassword(mockPassword.password);
    userPrev.validatePhone(mockQueryPhoneOtp);
    userPrev.registerBirth(mockBirth);
    userPrev.registerAddress(mockAddress);

    const user = userPrev;
    const uid = '123';
    user.signup({ id: uid, properties: user.properties as IUserProperties });

    testSaga(signupUserGenerator, httpConnection, {
      type: IUserTypes.FETCH_SIGNUP_USER,
      payload: {
        user: userPrev,
        phoneOtp: mockQueryPhoneOtp.phoneOtp,
      },
    })
      .next()
      .call([userApi, userApi.createUser], { ...userPrev.properties, phoneOtp: mockQueryPhoneOtp.phoneOtp })
      .next()
      .call(AsyncStorage.getItem, IStoreKey.USER_EMAIL)
      .next('test@example.com')
      .call([authApi, authApi.login], {
        email: userPrev.properties.email,
        password: userPrev.properties.password,
      })
      .next(mockAuth)
      .call(httpConnection.attachBearerToken, mockAuth.accessToken)
      .next()
      .call([userApi, userApi.getUser])
      .next(user)
      .put(userSignedUp(user))
      .next(user)
      .put(loginSuccess({ auth: mockAuth }))
      .next()
      .put(checkCustomerStatus({ user }))
      .next()
      .call(navigate, { route: IUserStackPages.SIGNUP_CONGRATS })
      .next();
  });

  it('should save email if not in storage', () => {
    const userPrev = User.CreateFromEmail(new Email('test@example.com'));
    userPrev.registerIdentity(mockIdentity);
    userPrev.registerPassword(mockPassword.password);
    userPrev.validatePhone(mockQueryPhoneOtp);
    userPrev.registerBirth(mockBirth);
    userPrev.registerAddress(mockAddress);

    const user = userPrev;
    const uid = '123';
    user.signup({ id: uid, properties: user.properties as IUserProperties });

    testSaga(signupUserGenerator, httpConnection, {
      type: IUserTypes.FETCH_SIGNUP_USER,
      payload: {
        user: userPrev,
        phoneOtp: mockQueryPhoneOtp.phoneOtp,
      },
    })
      .next()
      .call([userApi, userApi.createUser], { ...userPrev.properties, phoneOtp: mockQueryPhoneOtp.phoneOtp })
      .next()
      .call(AsyncStorage.getItem, IStoreKey.USER_EMAIL)
      .next(null)
      .call(AsyncStorage.setItem, IStoreKey.USER_EMAIL, userPrev.properties.email?.value)
      .next(userPrev.properties.email?.value);
  });

  it('Should call InvalidPassword action if missing password', () => {
    const userPrev = User.CreateFromEmail(new Email('test@example.com'));

    testSaga(signupUserGenerator, httpConnection, {
      type: IUserTypes.FETCH_SIGNUP_USER,
      payload: {
        user: userPrev,
        phoneOtp: mockQueryPhoneOtp.phoneOtp,
      },
    })
      .next()
      .put(initializeUser())
      .next()
      .put(showUnknownError(new AuthError.InvalidPassword()))
      .next();
  });

  it('Should call InvalidEmailaction if missing email', () => {
    const userPrev = User.Create({ id: 123, properties: {} });

    testSaga(signupUserGenerator, httpConnection, {
      type: IUserTypes.FETCH_SIGNUP_USER,
      payload: {
        user: userPrev,
        phoneOtp: mockQueryPhoneOtp.phoneOtp,
      },
    })
      .next()
      .put(initializeUser())
      .next()
      .put(showUnknownError(new AuthError.InvalidEmail()))
      .next();
  });

  it('Should call showUnknownError action if 500', () => {
    const userPrev = User.CreateFromEmail(new Email('test@example.com'));
    userPrev.registerPassword(mockPassword.password);

    testSaga(signupUserGenerator, httpConnection, {
      type: IUserTypes.FETCH_SIGNUP_USER,
      payload: {
        user: userPrev,
        phoneOtp: mockQueryPhoneOtp.phoneOtp,
      },
    })
      .next()
      .call([userApi, userApi.createUser], { ...userPrev.properties, phoneOtp: mockQueryPhoneOtp.phoneOtp })
      .throw(new ServerError(mockError500))
      .put(initializeUser())
      .next()
      .put(showUnknownError(new ServerError(mockError500)))
      .next();
  });
});
