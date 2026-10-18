/* eslint-disable  @typescript-eslint/no-explicit-any */
import SagaTester from 'redux-saga-tester';
import Constants from 'expo-constants';
import dayjs from 'dayjs';

import {
  AuthError,
  Email,
  Phone,
  IGender,
  IRegisterAddressCommand,
  IRegisterBirthCommand,
  IRegisterIdentityCommand,
  IRegisterPasswordCommand,
  Prospect,
  PhoneOtp,
} from '@clean-rn/auth/domain';

import {
  checkEmailExistsSaga,
  registerIdentitySaga,
  registerPasswordSaga,
  registerBirthSaga,
  registerAddressSaga,
  checkPhoneExistsSaga,
  validatePhoneSaga,
} from '../../usecases/signup';
import {
  ISignupTypes,
  emailChecked,
  fetchCheckEmailExists,
  fetchCheckPhoneExists,
  phoneChecked,
  identityRegistered,
  passwordRegistered,
  birthRegistered,
  addressRegistered,
  signupFailed,
  fetchValidatePhone,
  phoneValidated,
} from '../../commands/signup';
import { ISignupState, signupReducer } from '../../state-management';
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

describe('CheckEmail - integration', () => {
  let sagaTester: SagaTester;
  let httpConnection: HttpConnection;

  const mockIdentity: IRegisterIdentityCommand = {
    gender: IGender.MAN,
    firstName: 'John',
    lastName: 'Smith',
    nationality: 'FR',
  };

  const mockPassword: IRegisterPasswordCommand = {
    password: 'azekpoakz',
  };

  const mockBirth: IRegisterBirthCommand = {
    birthday: dayjs('1980-01-01'),
    birthCountry: 'FR',
  };

  const mockAddress: IRegisterAddressCommand = {
    str: 'fake address',
    city: 'string',
    zip: 'string',
    country: 'GR',
  };

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
    const initialState: ISignupState = {
      pending: false,
      email: null,
      phone: null,
      prospect: null,
      user: null,
      error: null,
    };
    sagaTester = new SagaTester({
      initialState,
      reducers: signupReducer,
    });
  });

  it('Should store correct initial state if not initial state is provided', () => {
    const newState = signupReducer(undefined, {
      type: ISignupTypes.FETCH_CHECK_EMAIL_EXISTS,
      payload: {
        email: new Email('test@example.com'),
      },
    });

    expect(newState).toEqual({
      pending: true,
      email: new Email('test@example.com'),
      phone: null,
      prospect: null,
      user: null,
      error: null,
    });
  });

  it('Should store correct state in case if FETCH_CHECK_EMAIL', () => {
    sagaTester.start(wrapSagaHidingNotFoundError, checkEmailExistsSaga, httpConnection);

    sagaTester.dispatch(fetchCheckEmailExists({ email: new Email('test@example.com') }));
    expect(sagaTester.getState()).toEqual({
      pending: true,
      email: new Email('test@example.com'),
      phone: null,
      prospect: null,
      user: null,
      error: null,
    });
  });

  it('Should store correct state if EMAIL_CHECKED', () => {
    sagaTester.start(wrapSagaHidingNotFoundError, checkEmailExistsSaga, httpConnection);
    sagaTester.dispatch(fetchCheckEmailExists({ email: new Email('test@example.com') }));
    sagaTester.dispatch(emailChecked());

    expect(sagaTester.getState()).toEqual({
      pending: false,
      email: new Email('test@example.com'),
      phone: null,
      prospect: null,
      user: null,
      error: null,
    });
  });

  it('Should store correct state if SIGNUP_FAILED', () => {
    sagaTester.start(wrapSagaHidingNotFoundError, checkEmailExistsSaga, httpConnection);
    sagaTester.dispatch(fetchCheckEmailExists({ email: new Email('test@example.com') }));
    sagaTester.dispatch(signupFailed(new AuthError.SignupFailureEmailExists()));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      email: new Email('test@example.com'),
      phone: null,
      prospect: null,
      user: null,
      error: new AuthError.SignupFailureEmailExists(),
    });
  });

  it('Should store correct state if FETCH_CHECK_PHONE_EXISTS', () => {
    sagaTester.start(wrapSagaHidingNotFoundError, fetchCheckPhoneExists, httpConnection);
    sagaTester.dispatch(fetchCheckPhoneExists({ phone: new Phone('0616804613', 'FR') }));

    expect(sagaTester.getState()).toEqual({
      pending: true,
      email: null,
      phone: new Phone('0616804613', 'FR'),
      prospect: null,
      user: null,
      error: null,
    });
  });

  it('Should store correct state if PHONE_CHECKED', () => {
    const initialState: ISignupState = {
      pending: false,
      email: null,
      phone: new Phone('0616804613', 'FR'),
      prospect: null,
      user: null,
      error: null,
    };

    sagaTester = new SagaTester({
      initialState,
      reducers: signupReducer,
    });

    sagaTester.start(wrapSagaHidingNotFoundError, checkPhoneExistsSaga, httpConnection);
    sagaTester.dispatch(fetchCheckPhoneExists({ phone: new Phone('0616804613', 'FR') }));
    sagaTester.dispatch(phoneChecked());

    expect(sagaTester.getState()).toEqual({
      pending: false,
      email: null,
      phone: new Phone('0616804613', 'FR'),
      prospect: null,
      user: null,
      error: null,
    });
  });

  it('Should store correct state if FETCH_VALIDATE_PHONE', () => {
    sagaTester.start(wrapSagaHidingNotFoundError, fetchValidatePhone, httpConnection);
    sagaTester.dispatch(
      fetchValidatePhone({ phone: new Phone('0616804613', 'FR'), otp: new PhoneOtp('123456') }),
    );

    expect(sagaTester.getState()).toEqual({
      pending: true,
      email: null,
      phone: null,
      prospect: null,
      user: null,
      error: null,
    });
  });

  it('Should store correct state if PHONE_VALIDATED', () => {
    const initialState: ISignupState = {
      pending: false,
      email: null,
      phone: new Phone('0616804613', 'FR'),
      prospect: null,
      user: null,
      error: null,
    };

    sagaTester = new SagaTester({
      initialState,
      reducers: signupReducer,
    });

    sagaTester.start(wrapSagaHidingNotFoundError, validatePhoneSaga, httpConnection);
    sagaTester.dispatch(
      fetchValidatePhone({ phone: new Phone('0616804613', 'FR'), otp: new PhoneOtp('123456') }),
    );
    sagaTester.dispatch(phoneValidated());

    expect(sagaTester.getState()).toEqual({
      pending: false,
      email: null,
      phone: new Phone('0616804613', 'FR'),
      prospect: null,
      user: null,
      error: null,
    });
  });

  it('Should store correct state in case if IDENTITY_REGISTERED', () => {
    const initialState: ISignupState = {
      pending: false,
      email: new Email('test@example.com'),
      phone: null,
      prospect: null,
      user: null,
      error: null,
    };

    sagaTester = new SagaTester({
      initialState,
      reducers: signupReducer,
    });

    sagaTester.start(registerIdentitySaga);

    const prospect = Prospect.Create(new Email('test@example.com'));
    prospect.registerIdentity(mockIdentity);
    sagaTester.dispatch(identityRegistered(prospect));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      email: new Email('test@example.com'),
      phone: null,
      prospect: prospect,
      user: null,
      error: null,
    });
  });

  it('Should store correct state in case if PASSWORD_REGISTERED', () => {
    const prospect = Prospect.Create(new Email('test@example.com'));

    const initialState: ISignupState = {
      pending: false,
      email: new Email('test@example.com'),
      phone: null,
      prospect,
      user: null,
      error: null,
    };

    sagaTester = new SagaTester({
      initialState,
      reducers: signupReducer,
    });

    sagaTester.start(registerPasswordSaga);
    prospect.registerPassword(mockPassword.password);
    sagaTester.dispatch(passwordRegistered(prospect));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      email: new Email('test@example.com'),
      phone: null,
      prospect,
      user: null,
      error: null,
    });
  });

  it('Should store correct state in case if BIRTH_REGISTERED', () => {
    const prospect = Prospect.Create(new Email('test@example.com'));

    const initialState: ISignupState = {
      pending: false,
      email: new Email('test@example.com'),
      phone: null,
      prospect,
      user: null,
      error: null,
    };

    sagaTester = new SagaTester({
      initialState,
      reducers: signupReducer,
    });

    sagaTester.start(registerBirthSaga);
    prospect.registerBirth(mockBirth);
    sagaTester.dispatch(birthRegistered(prospect));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      email: new Email('test@example.com'),
      phone: null,
      prospect,
      user: null,
      error: null,
    });
  });

  it('Should store correct state in case if ADDRESS_REGISTERED', () => {
    const prospect = Prospect.Create(new Email('test@example.com'));

    const initialState: ISignupState = {
      pending: false,
      email: new Email('test@example.com'),
      phone: null,
      prospect,
      user: null,
      error: null,
    };

    sagaTester = new SagaTester({
      initialState,
      reducers: signupReducer,
    });

    sagaTester.start(registerAddressSaga);
    prospect.registerAddress(mockAddress);
    sagaTester.dispatch(addressRegistered(prospect));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      email: new Email('test@example.com'),
      phone: null,
      prospect,
      user: null,
      error: null,
    });
  });
});
