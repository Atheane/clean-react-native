import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import * as Sentry from '@sentry/react-native';

import { ServerError } from '@clean-rn/shared/infrastructure';

import { IGlobalErrorTypes } from '../../commands/manage-global-errors';
import { showUnknownErrorGenerator, showUnknownErrorSaga } from '../../usecases/manage-global-errors';
import { IAuthStackPages } from '../../../presentation/types';
import { navigate } from '../../../presentation/navigation/navigationRef';
import { loggedOut } from '../../../../auth/application/commands';

jest.mock('@sentry/react-native', () => ({
  captureException: jest.fn(),
  init: jest.fn(),
}));

describe('Manage Global Errors - usecase', () => {
  const genObject = showUnknownErrorSaga();
  const mockError401 = {
    message: 'Core::AuthService::Unauthorized - Unauthorized',
    statusCode: 401,
    response: 'Core::AuthService::Unauthorized - Unauthorized',
    timestamp: '2024-01-07T15:28:04.657Z',
    path: '/app/account',
  };
  it('Should wait for SHOW_UNKNOWN_ERROR action and call showUnknownErrorSaga, should be done on next iteration', () => {
    expect(genObject.next().value).toEqual(
      takeEvery(IGlobalErrorTypes.SHOW_UNKNOWN_ERROR, showUnknownErrorGenerator),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should cancel if Network request failed message error', async () => {
    testSaga(showUnknownErrorGenerator, {
      type: IGlobalErrorTypes.SHOW_UNKNOWN_ERROR,
      payload: new Error('Network request failed'),
    })
      .next()
      .cancel();
  });

  it('Should cancel if 401', async () => {
    testSaga(showUnknownErrorGenerator, {
      type: IGlobalErrorTypes.SHOW_UNKNOWN_ERROR,
      payload: new ServerError(mockError401),
    })
      .next()
      .call(Sentry.captureException, new ServerError(mockError401))
      .next()
      .put(loggedOut())
      .next()
      .call(navigate, { route: IAuthStackPages.LOGIN })
      .next()
      .cancel();
  });

  it('Should call showUnknownError', async () => {
    testSaga(showUnknownErrorGenerator, {
      type: IGlobalErrorTypes.SHOW_UNKNOWN_ERROR,
      payload: new Error('test'),
    })
      .next()
      .call(Sentry.captureException, new Error('test'))
      .next();
  });
});
