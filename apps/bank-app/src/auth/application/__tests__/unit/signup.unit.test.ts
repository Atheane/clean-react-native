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
import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { AuthApi } from '@clean-rn/auth/infrastructure';

import {
  checkEmailExistsGenerator,
  checkEmailExistsSaga,
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
import { selectUser, selectEmail, selectPhoneOtp } from '../../state-management/selectors';

import {
  ISignupTypes,
  addressRegistered,
  birthRegistered,
  emailChecked,
  identityRegistered,
  passwordRegistered,
  phoneChecked,
  phoneValidated,
  signupFailed,
  userSignedUp,
  fetchSignupUser,
} from '../../commands/signup';
import { IStoreKey } from '../../../../shared/application/types';
import { loadStorage } from '../../../../shared/application/commands/initialization';
import { IAuthStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';

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

  it('should wait for FETCH_CHECK_EMAIL action and call checkEmailApiSaga, should be done on next iteration', () => {
    const genObject = checkEmailExistsSaga(httpConnection);

    expect(genObject.next().value).toEqual(
      takeEvery(ISignupTypes.FETCH_CHECK_EMAIL_EXISTS, checkEmailExistsGenerator, httpConnection),
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

  it('should wait for FETCH_CHECK_PHONE_EXISTS action and call registerPhoneGenerator, should be done on next iteration', () => {
    const genObject = checkPhoneSaga(httpConnection);

    expect(genObject.next().value).toEqual(
      takeEvery(ISignupTypes.FETCH_CHECK_PHONE, checkPhoneGenerator, httpConnection),
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

  it('should call checkEmailSuccess actions if email does not exists', () => {
    const mockQueryEmail = {
      email: new Email('test@example.com'),
    };
    const mockSuccessFalse: ISuccess = {
      success: false,
    };

    testSaga(checkEmailExistsGenerator, httpConnection, {
      type: ISignupTypes.FETCH_CHECK_EMAIL_EXISTS,
      payload: mockQueryEmail,
    })
      .next()
      .call([api, api.searchEmail], mockQueryEmail)
      .next(mockSuccessFalse)
      .put(emailChecked())
      .next();
  });

  it('should throw SignupFailureEmailExists if email exists', () => {
    testSaga(checkEmailExistsGenerator, httpConnection, {
      type: ISignupTypes.FETCH_CHECK_EMAIL_EXISTS,
      payload: mockQueryEmail,
    })
      .next()
      .call([api, api.searchEmail], mockQueryEmail)
      .next(mockSuccessTrue)
      .put(signupFailed(new AuthError.SignupFailureEmailExists()))
      .next()
      .call(AsyncStorage.setItem, IStoreKey.USER_EMAIL, mockQueryEmail.email.value)
      .next(mockQueryEmail.email.value)
      .put(loadStorage())
      .next(mockQueryEmail.email)
      .call(navigate, { route: IAuthStackPages.LOGIN })
      .next()
      .cancel();
  });

  it('should call registerIdentity actions', () => {
    const user = User.Create(new Email('test@example.com'));
    user.registerIdentity(mockIdentity);

    testSaga(registerIdentityGenerator, {
      type: ISignupTypes.REGISTER_IDENTITY,
      payload: { email: new Email('test@example.com'), ...mockIdentity },
    })
      .next()
      .put(identityRegistered(user))
      .next();
  });

  it('should call registerPassword actions', () => {
    const userPrev = User.Create(new Email('test@example.com'));
    const user = User.Create(new Email('test@example.com'));
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
    const user = User.Create(new Email('test@example.com'));
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

  it('should call phoneChecked', () => {
    testSaga(checkPhoneGenerator, httpConnection, {
      type: ISignupTypes.FETCH_CHECK_PHONE,
      payload: mockQueryPhone,
    })
      .next()
      .call([api, api.searchPhone], mockQueryPhone)
      .next(mockSuccessFalse)
      .call([api, api.sendPhoneValidation], mockQueryPhone)
      .next(mockSuccessTrue)
      .put(phoneChecked())
      .next();
  });

  it('should call signupFailed action if phone exists', () => {
    testSaga(checkPhoneGenerator, httpConnection, {
      type: ISignupTypes.FETCH_CHECK_PHONE,
      payload: mockQueryPhone,
    })
      .next()
      .call([api, api.searchPhone], mockQueryPhone)
      .next(mockSuccessTrue)
      .put(signupFailed(new AuthError.SignupFailurePhoneExists()))
      .next()
      .cancel();
  });

  it('should call phoneValidated', () => {
    const userPrev = User.Create(new Email('test@example.com'));

    const user = User.Create(new Email('test@example.com'));
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
              selector: selectUser,
            }),
          }),
        );
      })
      .next(userPrev)
      .put(phoneValidated(user))
      .next();
  });

  it('should call phoneValidated is user not in store', () => {
    const user = User.Create(new Email('test@example.com'));
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
      .put(phoneValidated(user))
      .next();
  });

  it('should call signupFailed action if otp incorrect', () => {
    const user = User.Create(new Email('test@example.com'));
    user.validatePhone(mockQueryPhoneOtp);

    testSaga(validatePhoneGenerator, httpConnection, {
      type: ISignupTypes.SIGNUP_FAILED,
      payload: mockQueryPhoneOtp,
    })
      .next()
      .call([api, api.checkPhoneValidation], mockQueryPhoneOtp)
      .next(mockSuccessFalse)
      .put(signupFailed(new AuthError.SignupFailureIncorrectPhoneCode()))
      .next()
      .cancel();
  });

  it('should call registerBirth actions', () => {
    const userPrev = User.Create(new Email('test@example.com'));
    const user = User.Create(new Email('test@example.com'));
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
              selector: selectUser,
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
    const user = User.Create(new Email('test@example.com'));
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

  it('should call registerAddress actions if user exists', () => {
    const userPrev = User.Create(new Email('test@example.com'));
    const user = User.Create(new Email('test@example.com'));
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
    const user = User.Create(new Email('test@example.com'));
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

  it('should call userSignedUp actions if user exists', () => {
    const userPrev = User.Create(new Email('test@example.com'));
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
      .call(navigate, { route: IAuthStackPages.SIGNUP_CONGRATS })
      .next();
  });
});
