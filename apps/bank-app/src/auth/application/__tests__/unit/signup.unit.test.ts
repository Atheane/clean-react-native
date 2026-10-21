import { SelectEffectDescriptor, SimpleEffect, takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import Constants from 'expo-constants';
import dayjs from 'dayjs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Email,
  Phone,
  IGender,
  IRegisterIdentityCommand,
  ISuccess,
  IRegisterPasswordCommand,
  IRegisterBirthCommand,
  IRegisterAddressCommand,
  AuthError,
  PhoneOtp,
  User,
  IUserProperties,
} from '@clean-rn/auth/domain';
import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { AuthApi, IUserSearchServerCode } from '@clean-rn/auth/infrastructure';

import { applicationInitialized } from '../../../../shared/application/commands/initialize-application';

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
} from '../../usecases/signup';
import {
  selectUserFromSignup,
  selectEmailFromSignup,
  selectPhoneOtpFromSignup,
} from '../../state-management/selectors';

import {
  ISignupTypes,
  addressRegistered,
  birthRegistered,
  emailNotFound,
  identityRegistered,
  passwordRegistered,
  phoneValidated,
  signupFailed,
  userSignedUp,
  fetchSignupUser,
  initializeSignupStep,
  phoneCodeSent,
  phoneNotFound,
} from '../../commands/signup';
import { IStoreKey } from '../../../../shared/application/types';
import { loadStorage } from '../../../../shared/application/commands/initialize-application';
import { IAuthStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

describe('Signup - usecase', () => {
  const httpConnection = HttpConnection.getInstance(Constants.expoConfig?.extra?.BASE_URL_API);
  const api = AuthApi.getInstance(httpConnection);

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
      takeEvery(ISignupTypes.FETCH_SEARCH_EMAIL, checkEmailGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('should wait for REGISTER_IDENTITY action and call registerIdentityGenerator, should be done on next iteration', () => {
    const genObject = registerIdentitySaga();

    expect(genObject.next().value).toEqual(
      takeEvery(ISignupTypes.REGISTER_IDENTITY, registerIdentityGenerator),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('should wait for REGISTER_PASSWORD action and call registerPasswordGenerator, should be done on next iteration', () => {
    const genObject = registerPasswordSaga();

    expect(genObject.next().value).toEqual(
      takeEvery(ISignupTypes.REGISTER_PASSWORD, registerPasswordGenerator),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('should wait for FETCH_SEARCH_PHONE action and call checkPhoneGenerator, should be done on next iteration', () => {
    const genObject = checkPhoneSaga(httpConnection);

    expect(genObject.next().value).toEqual(
      takeEvery(ISignupTypes.FETCH_SEARCH_PHONE, checkPhoneGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('should wait for FETCH_VALIDATE_PHONE action and call validatePhoneGenerator, should be done on next iteration', () => {
    const genObject = validatePhoneSaga(httpConnection);

    expect(genObject.next().value).toEqual(
      takeEvery(ISignupTypes.FETCH_VALIDATE_PHONE, validatePhoneGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('should wait for REGISTER_BIRTH action and call registerBirthGenerator, should be done on next iteration', () => {
    const genObject = registerBirthSaga();

    expect(genObject.next().value).toEqual(takeEvery(ISignupTypes.REGISTER_BIRTH, registerBirthGenerator));
    expect(genObject.next().done).toBeTruthy();
  });

  it('should wait for REGISTER_ADDRESS action and call registerAddressGenerator, should be done on next iteration', () => {
    const genObject = registerAddressSaga();

    expect(genObject.next().value).toEqual(
      takeEvery(ISignupTypes.REGISTER_ADDRESS, registerAddressGenerator),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('should wait for FETCH_SIGNUP_USER action and call signupUserGenerator, should be done on next iteration', () => {
    const genObject = signupUserSaga(httpConnection);

    expect(genObject.next().value).toEqual(
      takeEvery(ISignupTypes.FETCH_SIGNUP_USER, signupUserGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('should call emailNotFound actions if email does not exists', () => {
    const mockQueryEmail = {
      email: new Email('test@example.com'),
    };

    testSaga(checkEmailGenerator, httpConnection, {
      type: ISignupTypes.FETCH_SEARCH_EMAIL,
      payload: mockQueryEmail,
    })
      .next()
      .call([api, api.searchEmail], mockQueryEmail)
      .next(IUserSearchServerCode.NOT_FOUND)
      .put(emailNotFound())
      .next();
  });

  it('should throw SignupFailureEmailExists if email exists', () => {
    testSaga(checkEmailGenerator, httpConnection, {
      type: ISignupTypes.FETCH_SEARCH_EMAIL,
      payload: mockQueryEmail,
    })
      .next()
      .call([api, api.searchEmail], mockQueryEmail)
      .next(IUserSearchServerCode.EMAIL_EXISTS)
      .put(signupFailed(new AuthError.SignupFailureEmailExists()))
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
      type: ISignupTypes.FETCH_SEARCH_EMAIL,
      payload: mockQueryEmail,
    })
      .next()
      .call([api, api.searchEmail], mockQueryEmail)
      .next(IUserSearchServerCode.KELVIN_USER)
      .put(signupFailed(new AuthError.SignupFailureEmailExists()))
      .next()
      .call(AsyncStorage.setItem, IStoreKey.USER_EMAIL, mockQueryEmail.email.value)
      .next(mockQueryEmail.email.value)
      .put(loadStorage())
      .next(mockQueryEmail.email)
      .call(navigate, { route: IAuthStackPages.EMAIL_SENT })
      .next();
  });

  it('Should call showUnknownError action if 500 when fetchSearchEmail', () => {
    testSaga(checkEmailGenerator, httpConnection, {
      type: ISignupTypes.FETCH_SEARCH_EMAIL,
      payload: mockQueryEmail,
    })
      .next()
      .call([api, api.searchEmail], mockQueryEmail)
      .next()
      .throw(new ServerError(mockError500))
      .put(initializeSignupStep())
      .next()
      .put(showUnknownError(new ServerError(mockError500)))
      .next();
  });

  it('should call registerIdentity actions', () => {
    const user = User.CreateFromEmail(new Email('test@example.com'));
    user.registerIdentity(mockIdentity);

    testSaga(registerIdentityGenerator, {
      type: ISignupTypes.REGISTER_IDENTITY,
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
      type: ISignupTypes.REGISTER_IDENTITY,
      payload: { email: new Email('test@example.com'), ...mockIdentity },
    })
      .next()
      .throw(new Error('unknown error'))
      .put(initializeSignupStep())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });

  it('should call registerPassword actions', () => {
    const userPrev = User.CreateFromEmail(new Email('test@example.com'));
    const user = User.CreateFromEmail(new Email('test@example.com'));
    user.registerPassword(mockPassword.password);
    testSaga(registerPasswordGenerator, {
      type: ISignupTypes.REGISTER_PASSWORD,
      payload: mockPassword,
    })
      .next()
      .inspect<SimpleEffect<'SELECT', SelectEffectDescriptor>>((yieldedValue) => {
        expect(yieldedValue.type).toEqual('SELECT');
        expect(yieldedValue).toEqual(
          expect.objectContaining({
            type: 'SELECT',
            payload: expect.objectContaining({
              selector: selectUserFromSignup,
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
      type: ISignupTypes.REGISTER_PASSWORD,
      payload: mockPassword,
    })
      .next()
      .inspect<SimpleEffect<'SELECT', SelectEffectDescriptor>>((yieldedValue) => {
        expect(yieldedValue.type).toEqual('SELECT');
        expect(yieldedValue).toEqual(
          expect.objectContaining({
            type: 'SELECT',
            payload: expect.objectContaining({
              selector: selectUserFromSignup,
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
              selector: selectEmailFromSignup,
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
      type: ISignupTypes.REGISTER_PASSWORD,
      payload: mockPassword,
    })
      .next()
      .throw(new Error('unknown error'))
      .put(initializeSignupStep())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });

  it('should call phoneCodeSent if signup flow and phone not found', () => {
    const user = User.CreateFromEmail(new Email('test@example.com'));
    testSaga(checkPhoneGenerator, httpConnection, {
      type: ISignupTypes.FETCH_SEARCH_PHONE,
      payload: mockQueryPhone,
    })
      .next()
      .call([api, api.searchPhone], mockQueryPhone)
      .next(IUserSearchServerCode.NOT_FOUND)
      .select(selectUserFromSignup)
      .next(user)
      .call([api, api.sendPhoneValidation], mockQueryPhone)
      .next(mockSuccessTrue)
      .put(phoneCodeSent())
      .next();
  });

  it('should call signupFailed action if signup flow phone exists', () => {
    const user = User.CreateFromEmail(new Email('test@example.com'));

    testSaga(checkPhoneGenerator, httpConnection, {
      type: ISignupTypes.FETCH_SEARCH_PHONE,
      payload: mockQueryPhone,
    })
      .next()
      .call([api, api.searchPhone], mockQueryPhone)
      .next(IUserSearchServerCode.PHONE_EXISTS)
      .select(selectUserFromSignup)
      .next(user)
      .put(signupFailed(new AuthError.SignupFailurePhoneExists()))
      .next()
      .cancel();
  });

  it('should call phoneCodeSent action if migration flow phone exists', () => {
    testSaga(checkPhoneGenerator, httpConnection, {
      type: ISignupTypes.FETCH_SEARCH_PHONE,
      payload: mockQueryPhone,
    })
      .next()
      .call([api, api.searchPhone], mockQueryPhone)
      .next(IUserSearchServerCode.PHONE_EXISTS)
      .select(selectUserFromSignup)
      .next(null)
      .call([api, api.sendPhoneValidation], mockQueryPhone)
      .next(mockSuccessTrue)
      .put(phoneCodeSent())
      .next();
  });

  it('should call phoneNotFound action if migration flow phone not found', () => {
    testSaga(checkPhoneGenerator, httpConnection, {
      type: ISignupTypes.FETCH_SEARCH_PHONE,
      payload: mockQueryPhone,
    })
      .next()
      .call([api, api.searchPhone], mockQueryPhone)
      .next(IUserSearchServerCode.NOT_FOUND)
      .select(selectUserFromSignup)
      .next(null)
      .put(phoneNotFound(new AuthError.ValidatePhoneFailurePhoneNotFound()))
      .next()
      .cancel();
  });

  it('Should call showUnknownError action if 500 when fetchSearchPhone', () => {
    testSaga(checkPhoneGenerator, httpConnection, {
      type: ISignupTypes.FETCH_SEARCH_PHONE,
      payload: mockQueryPhone,
    })
      .next()
      .call([api, api.searchPhone], mockQueryPhone)
      .next()
      .throw(new ServerError(mockError500))
      .put(initializeSignupStep())
      .next()
      .put(showUnknownError(new ServerError(mockError500)))
      .next();
  });

  it('should call phoneValidated', () => {
    const userPrev = User.CreateFromEmail(new Email('test@example.com'));

    const user = User.CreateFromEmail(new Email('test@example.com'));
    user.validatePhone(mockQueryPhoneOtp);

    testSaga(validatePhoneGenerator, httpConnection, {
      type: ISignupTypes.FETCH_VALIDATE_PHONE,
      payload: mockQueryPhoneOtp,
    })
      .next(mockQueryPhoneOtp)
      .call([api, api.checkPhoneValidation], mockQueryPhoneOtp)
      .next(mockSuccessTrue)
      .inspect<SimpleEffect<'SELECT', SelectEffectDescriptor>>((yieldedValue) => {
        expect(yieldedValue.type).toEqual('SELECT');
        expect(yieldedValue).toEqual(
          expect.objectContaining({
            type: 'SELECT',
            payload: expect.objectContaining({
              selector: selectUserFromSignup,
            }),
          }),
        );
      })
      .next(userPrev)
      .put(phoneValidated(user))
      .next()
      .call(navigate, { route: IAuthStackPages.SIGNUP_BIRTH })
      .next();
  });

  it('should call phoneValidated is user not in store', () => {
    const user = User.CreateFromEmail(new Email('test@example.com'));
    user.validatePhone(mockQueryPhoneOtp);

    testSaga(validatePhoneGenerator, httpConnection, {
      type: ISignupTypes.FETCH_VALIDATE_PHONE,
      payload: mockQueryPhoneOtp,
    })
      .next()
      .call([api, api.checkPhoneValidation], mockQueryPhoneOtp)
      .next(mockSuccessTrue)
      .inspect<SimpleEffect<'SELECT', SelectEffectDescriptor>>((yieldedValue) => {
        expect(yieldedValue.type).toEqual('SELECT');
        expect(yieldedValue).toEqual(
          expect.objectContaining({
            type: 'SELECT',
            payload: expect.objectContaining({
              selector: selectUserFromSignup,
            }),
          }),
        );
      })
      .next(null)
      .put(phoneValidated(null))
      .next()
      .call(navigate, { route: IAuthStackPages.SIGNUP_CONGRATS })
      .next()
      .cancel();
  });

  it('should call signupFailed action if otp incorrect', () => {
    const user = User.CreateFromEmail(new Email('test@example.com'));
    user.validatePhone(mockQueryPhoneOtp);

    testSaga(validatePhoneGenerator, httpConnection, {
      type: ISignupTypes.SIGNUP_FAILED,
      payload: mockQueryPhoneOtp,
    })
      .next()
      .call([api, api.checkPhoneValidation], mockQueryPhoneOtp)
      .next(mockSuccessFalse)
      .put(signupFailed(new AuthError.ValidatePhoneIncorrectPhoneCode()))
      .next()
      .cancel();
  });

  it('Should call showUnknownError action if unknown error when validatePhone', () => {
    const user = User.CreateFromEmail(new Email('test@example.com'));
    user.validatePhone(mockQueryPhoneOtp);

    testSaga(validatePhoneGenerator, httpConnection, {
      type: ISignupTypes.SIGNUP_FAILED,
      payload: mockQueryPhoneOtp,
    })
      .next()
      .throw(new Error('unknown error'))
      .put(initializeSignupStep())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });

  it('should call registerBirth actions', () => {
    const userPrev = User.CreateFromEmail(new Email('test@example.com'));
    const user = User.CreateFromEmail(new Email('test@example.com'));
    user.registerBirth(mockBirth);

    testSaga(registerBirthGenerator, {
      type: ISignupTypes.REGISTER_BIRTH,
      payload: mockBirth,
    })
      .next()
      .inspect<SimpleEffect<'SELECT', SelectEffectDescriptor>>((yieldedValue) => {
        expect(yieldedValue.type).toEqual('SELECT');
        expect(yieldedValue).toEqual(
          expect.objectContaining({
            type: 'SELECT',
            payload: expect.objectContaining({
              selector: selectUserFromSignup,
            }),
          }),
        );
      })
      .next(userPrev)
      .put(birthRegistered(user))
      .next()
      .call(navigate, { route: IAuthStackPages.SIGNUP_ADDRESS })
      .next();
  });

  it('should call registerBirth actions if no user in store', () => {
    const user = User.CreateFromEmail(new Email('test@example.com'));
    user.registerBirth(mockBirth);

    testSaga(registerBirthGenerator, {
      type: ISignupTypes.REGISTER_BIRTH,
      payload: mockBirth,
    })
      .next()
      .inspect<SimpleEffect<'SELECT', SelectEffectDescriptor>>((yieldedValue) => {
        expect(yieldedValue.type).toEqual('SELECT');
        expect(yieldedValue).toEqual(
          expect.objectContaining({
            type: 'SELECT',
            payload: expect.objectContaining({
              selector: selectUserFromSignup,
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
              selector: selectEmailFromSignup,
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
      type: ISignupTypes.REGISTER_BIRTH,
      payload: mockBirth,
    })
      .next()
      .throw(new Error('unknown error'))
      .put(initializeSignupStep())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });

  it('should call registerAddress actions if user exists', () => {
    const userPrev = User.CreateFromEmail(new Email('test@example.com'));
    const user = User.CreateFromEmail(new Email('test@example.com'));
    user.registerAddress(mockAddress);

    testSaga(registerAddressGenerator, {
      type: ISignupTypes.REGISTER_ADDRESS,
      payload: mockAddress,
    })
      .next()
      .inspect<SimpleEffect<'SELECT', SelectEffectDescriptor>>((yieldedValue) => {
        expect(yieldedValue.type).toEqual('SELECT');
        expect(yieldedValue).toEqual(
          expect.objectContaining({
            type: 'SELECT',
            payload: expect.objectContaining({
              selector: selectUserFromSignup,
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
              selector: selectPhoneOtpFromSignup,
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
      type: ISignupTypes.REGISTER_ADDRESS,
      payload: { user, ...mockAddress },
    })
      .next()
      .inspect<SimpleEffect<'SELECT', SelectEffectDescriptor>>((yieldedValue) => {
        expect(yieldedValue.type).toEqual('SELECT');
        expect(yieldedValue).toEqual(
          expect.objectContaining({
            type: 'SELECT',
            payload: expect.objectContaining({
              selector: selectUserFromSignup,
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
              selector: selectEmailFromSignup,
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
              selector: selectPhoneOtpFromSignup,
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
      type: ISignupTypes.REGISTER_ADDRESS,
      payload: { user, ...mockAddress },
    })
      .next()
      .throw(new Error('unknown error'))
      .put(initializeSignupStep())
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
      type: ISignupTypes.FETCH_SIGNUP_USER,
      payload: {
        user: userPrev,
        phoneOtp: mockQueryPhoneOtp.phoneOtp,
      },
    })
      .next()
      .call([api, api.createUser], { ...userPrev.properties, phoneOtp: mockQueryPhoneOtp.phoneOtp })
      .next({ uid })
      .put(userSignedUp(user))
      .next(user)
      .call(AsyncStorage.setItem, IStoreKey.USER_EMAIL, user.properties.email?.value)
      .next(userPrev.properties.email?.value)
      .put(
        applicationInitialized({
          email: user.properties.email ?? null,
          initRouteName: IAuthStackPages.SIGNUP_CONGRATS,
          carbon: {
            house: {
              footprint: null,
              average: null,
            },
            transport: {
              footprint: null,
              average: null,
            },
            food: {
              footprint: null,
              average: null,
            },
            fly: {
              footprint: null,
              average: null,
            },
          },
        }),
      )
      .next()
      .call(navigate, { route: IAuthStackPages.SIGNUP_CONGRATS })
      .next();
  });

  it('Should call showUnknownError action if 500', () => {
    const userPrev = User.CreateFromEmail(new Email('test@example.com'));

    testSaga(signupUserGenerator, httpConnection, {
      type: ISignupTypes.FETCH_SIGNUP_USER,
      payload: {
        user: userPrev,
        phoneOtp: mockQueryPhoneOtp.phoneOtp,
      },
    })
      .next()
      .call([api, api.createUser], { ...userPrev.properties, phoneOtp: mockQueryPhoneOtp.phoneOtp })
      .throw(new ServerError(mockError500))
      .put(initializeSignupStep())
      .next()
      .put(showUnknownError(new ServerError(mockError500)))
      .next();
  });
});
