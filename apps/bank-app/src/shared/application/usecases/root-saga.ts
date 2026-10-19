import { all } from 'redux-saga/effects';

import { initializeApplicationSaga } from './initialize-application';
import { loadStorageSaga } from './load-storage';
import { showUnknownErrorSaga } from './manage-global-errors';

import {
  loginSaga,
  refreshLoginSaga,
  resetPasswordSaga,
  checkEmailSaga,
  registerIdentitySaga,
  registerPasswordSaga,
  checkPhoneSaga,
  registerBirthSaga,
  registerAddressSaga,
  validatePhoneSaga,
  signupUserSaga,
} from '../../../auth/application/usecases';
import { HttpConnection } from '@clean-rn/shared/infrastructure';

import { listAccountsSaga, listTransactionsSaga } from '../../../account/application/usecases';

// import {
//   houseEmissionsSaga,
//   transportEmissionsSaga,
//   foodEmissionsSaga,
//   flyEmissionsSaga,
// } from '@carbon/usecases';

export function* rootSaga(httpConnection: HttpConnection) {
  yield all([
    initializeApplicationSaga(),
    loadStorageSaga(),
    showUnknownErrorSaga(),
    loginSaga(httpConnection),
    refreshLoginSaga(),
    resetPasswordSaga(httpConnection),
    checkEmailSaga(httpConnection),
    registerIdentitySaga(),
    registerPasswordSaga(),
    checkPhoneSaga(httpConnection),
    registerBirthSaga(),
    registerAddressSaga(),
    validatePhoneSaga(httpConnection),
    signupUserSaga(httpConnection),
    listAccountsSaga(httpConnection),
    listTransactionsSaga(httpConnection),
    // getTransactionsSaga(accountApi),
    // houseEmissionsSaga(),
    // transportEmissionsSaga(),
    // foodEmissionsSaga(),
    // flyEmissionsSaga(),
  ]);
}
