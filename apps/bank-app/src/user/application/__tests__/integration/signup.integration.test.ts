/* eslint-disable  @typescript-eslint/no-explicit-any */
import SagaTester from 'redux-saga-tester';
import Constants from 'expo-constants';
import dayjs from 'dayjs';

import {
  Phone,
  IGender,
  IRegisterAddressCommand,
  IRegisterBirthCommand,
  IRegisterIdentityCommand,
  IRegisterPasswordCommand,
  PhoneOtp,
  User,
  IUserProperties,
  UserError,
} from '@clean-rn/user/domain';

import { Email } from '@clean-rn/auth/domain';

import {
  checkEmailSaga,
  registerIdentitySaga,
  registerPasswordSaga,
  registerBirthSaga,
  registerAddressSaga,
  checkPhoneSaga,
  validatePhoneSaga,
  signupUserSaga,
} from '../../usecases';
import {
  IUserTypes,
  emailNotFound,
  fetchSearchEmail,
  fetchSearchPhone,
  phoneNotFound,
  identityRegistered,
  passwordRegistered,
  birthRegistered,
  addressRegistered,
  signupFailed,
  fetchValidatePhone,
  phoneValidated,
  userSignedUp,
  fetchSignupUser,
  registerIdentity,
  registerPassword,
  registerBirth,
  registerAddress,
  initializeUser,
  phoneCodeSent,
} from '../../commands';
import { IUserState, userReducer } from '../../state-management';
import { HttpConnection, wrapSagaHidingNotFoundError } from '@clean-rn/shared/infrastructure';

const expoConstantsMock = {
  name: 'CleanRN BankApp Test',
  slug: 'clean-rn-bank-app-test',
  extra: {
    BASE_URL_API: 'https://fake-api.com',
    NODE_ENV: 'test',
  },
};

jest.mock('expo-constants', () => expoConstantsMock);

describe('User - integration', () => {
  let sagaTester: SagaTester;
  let httpConnection: HttpConnection;

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

  const mockQueryPhoneOtp = {
    phoneOtp: new PhoneOtp('123456'),
    phone: new Phone('0616804613', 'FR'),
  };

  let initialState: IUserState;

  beforeAll(() => {
    Constants.expoConfig = {
      name: 'CleanRN BankApp Test',
      slug: 'clean-rn-bank-app-test',
      extra: {
        BASE_URL_API: 'https://fake-api.com',
        NODE_ENV: 'test',
      },
    };
    httpConnection = HttpConnection.getInstance(Constants.expoConfig?.extra?.BASE_URL_API);
  });

  beforeEach(() => {
    initialState = {
      pending: false,
      email: null,
      phone: null,
      phoneOtp: null,
      user: null,
      error: null,
      config: null,
    };
    sagaTester = new SagaTester({
      initialState,
      reducers: userReducer,
    });
  });

  it('Should store correct initial state if not initial state is provided', () => {
    const newState = userReducer(undefined, {
      type: IUserTypes.FETCH_SEARCH_EMAIL,
      payload: {
        email: new Email('test@example.com'),
      },
    });

    expect(newState).toEqual({
      pending: true,
      email: new Email('test@example.com'),
      phone: null,
      phoneOtp: null,
      user: null,
      error: null,
      config: null,
    });
  });

  it('Should store correct state in case if FETCH_SEARCH_EMAIL', () => {
    sagaTester.start(wrapSagaHidingNotFoundError, checkEmailSaga, httpConnection);

    sagaTester.dispatch(fetchSearchEmail({ email: new Email('test@example.com') }));
    expect(sagaTester.getState()).toEqual({
      pending: true,
      email: new Email('test@example.com'),
      phone: null,
      phoneOtp: null,
      user: null,
      error: null,
      config: null,
    });
  });

  it('Should store correct state in case if REGISTER_IDENTITY', () => {
    sagaTester.start(wrapSagaHidingNotFoundError, checkEmailSaga, httpConnection);

    sagaTester.dispatch(registerIdentity({ ...mockIdentity, email: new Email('test@example.com') }));
    expect(sagaTester.getState()).toEqual({
      ...initialState,
    });
  });

  it('Should store correct state in case if REGISTER_PASSWORD', () => {
    sagaTester.start(wrapSagaHidingNotFoundError, checkEmailSaga, httpConnection);

    sagaTester.dispatch(registerPassword(mockPassword));
    expect(sagaTester.getState()).toEqual({
      ...initialState,
    });
  });

  it('Should store correct state in case if REGISTER_BIRTH', () => {
    sagaTester.start(wrapSagaHidingNotFoundError, checkEmailSaga, httpConnection);

    sagaTester.dispatch(registerBirth(mockBirth));
    expect(sagaTester.getState()).toEqual({
      ...initialState,
    });
  });

  it('Should store correct state in case if REGISTER_ADDRESS', () => {
    sagaTester.start(wrapSagaHidingNotFoundError, checkEmailSaga, httpConnection);

    sagaTester.dispatch(registerAddress(mockAddress));
    expect(sagaTester.getState()).toEqual({
      ...initialState,
    });
  });

  it('Should store correct state if FETCH_SEARCH_PHONE', () => {
    sagaTester.start(wrapSagaHidingNotFoundError, fetchSearchPhone, httpConnection);
    sagaTester.dispatch(fetchSearchPhone({ phone: new Phone('0616804613', 'FR') }));

    expect(sagaTester.getState()).toEqual({
      pending: true,
      email: null,
      phone: new Phone('0616804613', 'FR'),
      phoneOtp: null,
      user: null,
      error: null,
      config: null,
    });
  });

  it('Should store correct state if FETCH_VALIDATE_PHONE', () => {
    sagaTester.start(wrapSagaHidingNotFoundError, fetchValidatePhone, httpConnection);
    sagaTester.dispatch(
      fetchValidatePhone({ phone: new Phone('0616804613', 'FR'), phoneOtp: new PhoneOtp('123456') }),
    );

    expect(sagaTester.getState()).toEqual({
      pending: true,
      email: null,
      phone: null,
      phoneOtp: new PhoneOtp('123456'),
      user: null,
      error: null,
      config: null,
    });
  });

  it('Should store correct state in case if FETCH_SIGNUP_USER', () => {
    const user = User.CreateFromEmail(new Email('test@example.com'));
    user.registerIdentity(mockIdentity);
    user.registerPassword(mockPassword.password);
    user.validatePhone(mockQueryPhoneOtp);
    user.registerBirth(mockBirth);
    user.registerAddress(mockAddress);

    const initialState: IUserState = {
      pending: true,
      email: new Email('test@example.com'),
      phone: new Phone('0616804613', 'FR'),
      phoneOtp: new PhoneOtp('123456'),
      user,
      error: null,
      config: null,
    };

    sagaTester = new SagaTester({
      initialState,
      reducers: userReducer,
    });

    sagaTester.start(wrapSagaHidingNotFoundError, signupUserSaga, httpConnection);
    sagaTester.dispatch(fetchSignupUser({ user, phoneOtp: mockQueryPhoneOtp.phoneOtp }));

    expect(sagaTester.getState()).toEqual({
      pending: true,
      email: new Email('test@example.com'),
      phone: new Phone('0616804613', 'FR'),
      phoneOtp: new PhoneOtp('123456'),
      user,
      error: null,
      config: null,
    });
  });

  it('Should store correct state if EMAIL_CHECKED', () => {
    sagaTester.start(wrapSagaHidingNotFoundError, checkEmailSaga, httpConnection);
    sagaTester.dispatch(fetchSearchEmail({ email: new Email('test@example.com') }));
    sagaTester.dispatch(emailNotFound());

    expect(sagaTester.getState()).toEqual({
      pending: false,
      email: new Email('test@example.com'),
      phone: null,
      phoneOtp: null,
      user: null,
      error: null,
      config: null,
    });
  });

  it('Should store correct state if SIGNUP_FAILED', () => {
    sagaTester.start(wrapSagaHidingNotFoundError, checkEmailSaga, httpConnection);
    sagaTester.dispatch(fetchSearchEmail({ email: new Email('test@example.com') }));
    sagaTester.dispatch(signupFailed(new UserError.SignupFailureEmailExists()));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      email: new Email('test@example.com'),
      phone: null,
      phoneOtp: null,
      user: null,
      error: new UserError.SignupFailureEmailExists(),
      config: null,
    });
  });

  it('Should store correct state if PHONE_CHECKED', () => {
    const initialState: IUserState = {
      pending: false,
      email: null,
      phone: new Phone('0616804613', 'FR'),
      phoneOtp: null,
      user: null,
      error: null,
      config: null,
    };

    sagaTester = new SagaTester({
      initialState,
      reducers: userReducer,
    });

    sagaTester.start(wrapSagaHidingNotFoundError, checkPhoneSaga, httpConnection);
    sagaTester.dispatch(fetchSearchPhone({ phone: new Phone('0616804613', 'FR') }));
    sagaTester.dispatch(phoneCodeSent());

    expect(sagaTester.getState()).toEqual({
      pending: false,
      email: null,
      phone: new Phone('0616804613', 'FR'),
      phoneOtp: null,
      user: null,
      error: null,
      config: null,
    });
  });

  it('Should store correct state if PHONE_VALIDATED', () => {
    const initialState: IUserState = {
      pending: false,
      email: null,
      phone: new Phone('0616804613', 'FR'),
      phoneOtp: new PhoneOtp('123456'),
      user: null,
      error: null,
      config: null,
    };

    sagaTester = new SagaTester({
      initialState,
      reducers: userReducer,
    });

    sagaTester.start(wrapSagaHidingNotFoundError, validatePhoneSaga, httpConnection);
    sagaTester.dispatch(
      fetchValidatePhone({ phone: new Phone('0616804613', 'FR'), phoneOtp: new PhoneOtp('123456') }),
    );
    const user = User.CreateFromEmail(new Email('test@example.com'));
    user.validatePhone({ phone: new Phone('0616804613', 'FR'), phoneOtp: new PhoneOtp('123456') });
    sagaTester.dispatch(phoneValidated(user));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      email: null,
      phone: new Phone('0616804613', 'FR'),
      phoneOtp: new PhoneOtp('123456'),
      user,
      error: null,
      config: null,
    });
  });

  it('Should store correct state in case if IDENTITY_REGISTERED', () => {
    const initialState: IUserState = {
      pending: false,
      email: new Email('test@example.com'),
      phone: null,
      phoneOtp: null,
      user: null,
      error: null,
      config: null,
    };

    sagaTester = new SagaTester({
      initialState,
      reducers: userReducer,
    });

    sagaTester.start(registerIdentitySaga);

    const user = User.CreateFromEmail(new Email('test@example.com'));
    user.registerIdentity(mockIdentity);
    sagaTester.dispatch(identityRegistered(user));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      email: new Email('test@example.com'),
      phone: null,
      phoneOtp: null,
      user,
      error: null,
      config: null,
    });
  });

  it('Should store correct state in case if PASSWORD_REGISTERED', () => {
    const user = User.CreateFromEmail(new Email('test@example.com'));

    const initialState: IUserState = {
      pending: false,
      email: new Email('test@example.com'),
      phone: null,
      phoneOtp: null,
      user,
      error: null,
      config: null,
    };

    sagaTester = new SagaTester({
      initialState,
      reducers: userReducer,
    });

    sagaTester.start(registerPasswordSaga);
    user.registerPassword(mockPassword.password);
    sagaTester.dispatch(passwordRegistered(user));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      email: new Email('test@example.com'),
      phone: null,
      phoneOtp: null,
      user,
      error: null,
      config: null,
    });
  });

  it('Should store correct state in case if BIRTH_REGISTERED', () => {
    const user = User.CreateFromEmail(new Email('test@example.com'));

    const initialState: IUserState = {
      pending: false,
      email: new Email('test@example.com'),
      phone: null,
      phoneOtp: null,
      user,
      error: null,
      config: null,
    };

    sagaTester = new SagaTester({
      initialState,
      reducers: userReducer,
    });

    sagaTester.start(registerBirthSaga);
    user.registerBirth(mockBirth);
    sagaTester.dispatch(birthRegistered(user));

    expect(sagaTester.getState()).toStrictEqual({
      pending: false,
      email: new Email('test@example.com'),
      phone: null,
      phoneOtp: null,
      user,
      error: null,
      config: null,
    });
  });

  it('Should store correct state in case if ADDRESS_REGISTERED', () => {
    const user = User.CreateFromEmail(new Email('test@example.com'));

    const initialState: IUserState = {
      pending: false,
      email: new Email('test@example.com'),
      phone: null,
      phoneOtp: null,
      user: null,
      error: null,
      config: null,
    };

    sagaTester = new SagaTester({
      initialState,
      reducers: userReducer,
    });

    sagaTester.start(registerAddressSaga);
    user.registerAddress(mockAddress);
    sagaTester.dispatch(addressRegistered(user));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      email: new Email('test@example.com'),
      phone: null,
      phoneOtp: null,
      user,
      error: null,
      config: null,
    });
  });

  it('Should store correct state in case if USER_SIGNED_UP', () => {
    const user = User.CreateFromEmail(new Email('test@example.com'));
    user.registerIdentity(mockIdentity);
    user.registerPassword(mockPassword.password);
    user.validatePhone(mockQueryPhoneOtp);
    user.registerBirth(mockBirth);
    user.registerAddress(mockAddress);

    const initialState: IUserState = {
      pending: false,
      email: new Email('test@example.com'),
      phone: new Phone('0616804613', 'FR'),
      phoneOtp: new PhoneOtp('123456'),
      user: null,
      error: null,
      config: null,
    };

    sagaTester = new SagaTester({
      initialState,
      reducers: userReducer,
    });

    sagaTester.start(signupUserSaga, httpConnection);

    const uid = '123';
    user.signup({ id: uid, properties: user.properties as IUserProperties });

    sagaTester.dispatch(userSignedUp(user));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      email: new Email('test@example.com'),
      phone: new Phone('0616804613', 'FR'),
      phoneOtp: new PhoneOtp('123456'),
      user,
      error: null,
      config: null,
    });
  });

  it('Should store correct state in case if PHONE_NOT_FOUND with no error', () => {
    const initialState: IUserState = {
      pending: false,
      email: null,
      phone: null,
      phoneOtp: null,
      user: null,
      error: null,
      config: null,
    };

    sagaTester = new SagaTester({
      initialState,
      reducers: userReducer,
    });

    sagaTester.dispatch(phoneNotFound(new UserError.ValidatePhoneFailurePhoneNotFound('test')));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      email: null,
      phone: null,
      phoneOtp: null,
      user: null,
      error: new UserError.ValidatePhoneFailurePhoneNotFound('test'),
      config: null,
    });
  });

  it('Should store correct state if INITIALIZE_SIGNUP for invalid credentials', () => {
    sagaTester.start(wrapSagaHidingNotFoundError, checkEmailSaga, httpConnection);

    sagaTester.dispatch(initializeUser());
    expect(sagaTester.getState()).toEqual({
      pending: false,
      email: null,
      phone: null,
      phoneOtp: null,
      user: null,
      error: null,
      config: null,
    });
  });
});
