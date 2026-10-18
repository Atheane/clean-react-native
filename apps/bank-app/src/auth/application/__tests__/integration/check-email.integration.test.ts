/* eslint-disable  @typescript-eslint/no-explicit-any */
import SagaTester from 'redux-saga-tester';

import { Email } from '@clean-rn/auth/domain';
import { HttpConnection } from '@clean-rn/shared/infrastructure';

import { checkEmailSaga } from '../../usecases/check-email';
import { ICheckEmailTypes, checkEmailSuccess, fetchCheckEmail } from '../../commands/check-email';
import { ICheckEmailState, checkEmailReducer } from '../../state-management';

describe('CheckEmail - integration', () => {
  const mockData = {
    email: new Email('test@example.com'),
  };

  let sagaTester: SagaTester;

  const mockResponse = {
    success: false,
  };

  const httpConnection = HttpConnection.getInstance('https://fake-api.com');

  beforeEach(() => {
    const initialState: ICheckEmailState = {
      pending: false,
      success: null,
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
    });
  });

  it('Should store correct state in case if FETCH_CHECK_EMAIL', () => {
    sagaTester.start(checkEmailSaga, httpConnection);

    sagaTester.dispatch(fetchCheckEmail(mockData));
    expect(sagaTester.getState()).toEqual({
      pending: true,
      success: null,
    });
  });

  it('Should store correct state if CHECK_EMAIL_SUCCESS', () => {
    sagaTester.start(checkEmailSaga, httpConnection);
    sagaTester.dispatch(fetchCheckEmail(mockData));
    sagaTester.dispatch(checkEmailSuccess(mockResponse));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      success: false,
    });
  });
});
