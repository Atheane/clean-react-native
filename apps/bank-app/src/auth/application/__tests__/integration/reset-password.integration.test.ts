/* eslint-disable  @typescript-eslint/no-explicit-any */
import SagaTester from 'redux-saga-tester';
import Constants from 'expo-constants';

import { Email } from '@clean-rn/auth/domain';

import { resetPasswordSaga } from '../../usecases/reset-password';
import {
  IResetPasswordTypes,
  fetchResetPassword,
  passwordReset,
  initResetPassword,
} from '../../commands/reset-password';
import { resetPasswordReducer } from '../../state-management';
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

describe('ResetPassword - integration', () => {
  const mockData = {
    email: new Email('test@example.com'),
  };

  const mockResponse = {
    success: true,
  };

  let sagaTester: SagaTester;

  let httpConnection: HttpConnection;

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
    const initialState = {
      pending: false,
      success: null,
    };
    sagaTester = new SagaTester({
      initialState,
      reducers: resetPasswordReducer,
    });
  });

  it('should store correct initial state if no initial state is provided', () => {
    const newState = resetPasswordReducer(undefined, {
      type: IResetPasswordTypes.FETCH_RESET_PASSWORD,
      payload: mockData,
    });

    expect(newState).toEqual({
      pending: true,
      success: null,
    });
  });

  it('Should store correct state in case if FETCH_RESET_PASSWORD', () => {
    sagaTester.start(wrapSagaHidingNotFoundError, resetPasswordSaga, httpConnection);

    sagaTester.dispatch(fetchResetPassword(mockData));

    expect(sagaTester.getState()).toEqual({
      pending: true,
      success: null,
    });
  });

  it('Should store correct state if RESET_PASSWORD_SUCCESS', () => {
    sagaTester.start(wrapSagaHidingNotFoundError, resetPasswordSaga, httpConnection);
    sagaTester.dispatch(fetchResetPassword(mockData));
    sagaTester.dispatch(passwordReset({ success: mockResponse.success }));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      success: mockResponse.success,
    });
  });

  it('Should store correct state in case if INIT_RESET_PASSWORD', () => {
    sagaTester.start(wrapSagaHidingNotFoundError, resetPasswordSaga, httpConnection);

    sagaTester.dispatch(initResetPassword());

    expect(sagaTester.getState()).toEqual({
      pending: false,
      success: null,
    });
  });
});
