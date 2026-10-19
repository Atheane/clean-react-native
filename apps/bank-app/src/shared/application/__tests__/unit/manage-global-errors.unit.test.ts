import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

import { IGlobalErrorTypes } from '../../commands/manage-global-errors';
import { showUnknownErrorGenerator, showUnknownErrorSaga } from '../../usecases/manage-global-errors';
import { IAuthStackPages } from '../../../presentation/types';
import { navigate } from '../../../presentation/navigation/navigationRef';

describe('Manage Global Errors - usecase', () => {
  const genObject = showUnknownErrorSaga();

  it('Should wait for SHOW_UNKNOWN_ERROR action and call showUnknownErrorSaga, should be done on next iteration', () => {
    expect(genObject.next().value).toEqual(
      takeEvery(IGlobalErrorTypes.SHOW_UNKNOWN_ERROR, showUnknownErrorGenerator),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should call showUnknownError', async () => {
    testSaga(showUnknownErrorGenerator, {
      type: IGlobalErrorTypes.SHOW_UNKNOWN_ERROR,
      payload: new Error('test'),
    })
      .next()
      .call(navigate, { route: IAuthStackPages.MODAL_ERROR })
      .next();
  });
});
