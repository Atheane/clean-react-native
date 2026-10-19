/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

import { closeLoginModalSaga, closeLoginModalGenerator } from '../../usecases/login';
import { ILoginTypes, resetError } from '../../commands/login';
import { goBack } from '../../../../shared/presentation/navigation/navigationRef';

describe('Close login modale - usecase', () => {
  const genObject = closeLoginModalSaga();

  it('Should wait for LOGIN_SUCCESS action and call loginGenerator, should be done on next iteration', () => {
    expect(genObject.next().value).toEqual(takeEvery(ILoginTypes.LOGIN_SUCCEDED, closeLoginModalGenerator));
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should navigate to previous screen - goBack', async () => {
    testSaga(closeLoginModalGenerator).next().put(resetError()).next().call(goBack).next();
  });
});
