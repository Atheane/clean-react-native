/* eslint-disable  @typescript-eslint/no-explicit-any */
import SagaTester from 'redux-saga-tester';
import Constants from 'expo-constants';

import { Email } from '@clean-rn/auth/domain';

import { checkEmailSaga } from '../../usecases/check-email';
import { ICheckEmailTypes, checkEmailSuccess, fetchCheckEmail } from '../../commands/check-email';
import { ICheckEmailState, checkEmailReducer } from '../../state-management';
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
  const mockData = {
    email: new Email('test@example.com'),
  };

  let sagaTester: SagaTester;
  let httpConnection: HttpConnection;

  const mockResponse = {
    success: false,
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
    const initialState: ICheckEmailState = {
      pending: false,
      success: null,
      email: null,
    };
    sagaTester = new SagaTester({
      initialState,
      reducers: checkEmailReducer,
    });
  });

  it('Should store correct initial state if not initial state is provided', () => {
    const newState = checkEmailReducer(undefined, {
      type: ICheckEmailTypes.FETCH_CHECK_EMAIL,
      payload: mockData,
    });

    expect(newState).toEqual({
      pending: true,
      success: null,
      email: mockData.email,
    });
  });

  it('Should store correct state in case if FETCH_CHECK_EMAIL', () => {
    sagaTester.start(wrapSagaHidingNotFoundError, checkEmailSaga, httpConnection);

    sagaTester.dispatch(fetchCheckEmail(mockData));
    expect(sagaTester.getState()).toEqual({
      pending: true,
      success: null,
      email: mockData.email,
    });
  });

  it('Should store correct state if CHECK_EMAIL_SUCCESS', () => {
    sagaTester.start(wrapSagaHidingNotFoundError, checkEmailSaga, httpConnection);
    sagaTester.dispatch(fetchCheckEmail(mockData));
    sagaTester.dispatch(checkEmailSuccess(mockResponse));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      success: false,
      email: mockData.email,
    });
  });
});
