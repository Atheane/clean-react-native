/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

import { refreshLoginSaga, refreshLoginGenerator } from '../../usecases/login';
import { ILoginTypes } from '../../commands/login';
import { IAuthStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';

describe('RefreshLogin - usecase', () => {
  const genObject = refreshLoginSaga();

  it('Should wait for USER_UNAUTHENTICATED action and call loginGenerator, should be done on next iteration', () => {
    expect(genObject.next().value).toEqual(
      takeEvery(ILoginTypes.USER_UNAUTHENTICATED, refreshLoginGenerator),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should redirect to LoginPage ', async () => {
    testSaga(refreshLoginGenerator).next().call(navigate, { route: IAuthStackPages.LOGIN }).next();
  });
});
