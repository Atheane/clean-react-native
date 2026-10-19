import { all } from 'redux-saga/effects';

import { initializeApplicationSaga } from './initialize-application';
import { loadStorageSaga } from './load-storage';
import { showUnknownErrorSaga } from './manage-global-errors';

import {
  loginSaga,
  resetPasswordSaga,
  checkEmailExistsSaga,
  registerIdentitySaga,
  registerPasswordSaga,
  checkPhoneSaga,
  registerBirthSaga,
  registerAddressSaga,
  validatePhoneSaga,
  signupUserSaga,
  // navigatePasswordToLoginSaga,
} from '../../../auth/application/usecases';
import { HttpConnection } from '@clean-rn/shared/infrastructure';

// import { getAccountsSaga, getTransactionsSaga } from '@account/usecases';
// import { accountApi } from '@account/infrastructure/services';

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
    resetPasswordSaga(httpConnection),
    checkEmailExistsSaga(httpConnection),
    registerIdentitySaga(),
    registerPasswordSaga(),
    checkPhoneSaga(httpConnection),
    registerBirthSaga(),
    registerAddressSaga(),
    validatePhoneSaga(httpConnection),
    signupUserSaga(httpConnection),
    // navigatePasswordToLoginSaga(),
    // getAccountsSaga(accountApi),
    // getTransactionsSaga(accountApi),
    // houseEmissionsSaga(),
    // transportEmissionsSaga(),
    // foodEmissionsSaga(),
    // flyEmissionsSaga(),
  ]);
}
