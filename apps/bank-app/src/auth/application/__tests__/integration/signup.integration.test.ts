/* eslint-disable  @typescript-eslint/no-explicit-any */
import SagaTester from 'redux-saga-tester';
import Constants from 'expo-constants';

import {
  Email,
  IGender,
  IRegisterIdentityCommand,
  IRegisterPasswordCommand,
  Prospect,
} from '@clean-rn/auth/domain';

import { checkEmailSaga, registerIdentitySaga } from '../../usecases/signup';
import {
  ISignupTypes,
  emailChecked,
  fetchCheckEmail,
  identityRegistered,
  passwordRegistered,
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

  const mockSuccessFalse = {
    success: false,
  };

  const mockIdentity: IRegisterIdentityCommand = {
    gender: IGender.MAN,
    firstName: 'John',
    lastName: 'Smith',
    nationality: 'FR',
  };

  const mockPassword: IRegisterPasswordCommand = {
    password: 'azekpoakz',
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
      success: null,
      email: null,
      prospect: null,
      user: null,
    };
    sagaTester = new SagaTester({
      initialState,
      reducers: signupReducer,
    });
  });

  it('Should store correct initial state if not initial state is provided', () => {
    const newState = signupReducer(undefined, {
      type: ISignupTypes.FETCH_CHECK_EMAIL,
      payload: new Email('test@example.com'),
    });

    expect(newState).toEqual({
      pending: true,
      success: null,
      email: new Email('test@example.com'),
      prospect: null,
      user: null,
    });
  });

  it('Should store correct state in case if FETCH_CHECK_EMAIL', () => {
    sagaTester.start(wrapSagaHidingNotFoundError, checkEmailSaga, httpConnection);

    sagaTester.dispatch(fetchCheckEmail(new Email('test@example.com')));
    expect(sagaTester.getState()).toEqual({
      pending: true,
      success: null,
      email: new Email('test@example.com'),
      prospect: null,
      user: null,
    });
  });

  it('Should store correct state if EMAIL_CHECKED', () => {
    sagaTester.start(wrapSagaHidingNotFoundError, checkEmailSaga, httpConnection);
    sagaTester.dispatch(fetchCheckEmail(new Email('test@example.com')));
    sagaTester.dispatch(emailChecked(mockSuccessFalse));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      success: false,
      email: new Email('test@example.com'),
      prospect: null,
      user: null,
    });
  });

  it('Should store correct state in case if IDENTITY_REGISTERED', () => {
    const initialState: ISignupState = {
      pending: false,
      success: false,
      email: new Email('test@example.com'),
      prospect: null,
      user: null,
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
      success: false,
      email: new Email('test@example.com'),
      prospect: prospect,
      user: null,
    });
  });

  it('Should store correct state in case if PASSWORD_REGISTERED', () => {
    const prospectIdentity = Prospect.Create(new Email('test@example.com'));
    prospectIdentity.registerIdentity(mockIdentity);

    const initialState: ISignupState = {
      pending: false,
      success: false,
      email: new Email('test@example.com'),
      prospect: prospectIdentity,
      user: null,
    };

    sagaTester = new SagaTester({
      initialState,
      reducers: signupReducer,
    });

    sagaTester.start(registerIdentitySaga);

    sagaTester.dispatch(identityRegistered(prospectIdentity));
    prospectIdentity.registerPassword(mockPassword.password);
    sagaTester.dispatch(passwordRegistered(prospectIdentity));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      success: false,
      email: new Email('test@example.com'),
      prospect: prospectIdentity,
      user: null,
    });
  });
});
