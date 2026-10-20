import { all } from 'redux-saga/effects';

import { initializeApplicationSaga } from './initialize-application';
import { loadStorageSaga } from './load-storage';
import { showUnknownErrorSaga } from './manage-global-errors';

import {
  loginSaga,
  closeLoginModalSaga,
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

import {
  computeHouseEmissionsSaga,
  computeTransportEmissionsSaga,
  computeFoodEmissionsSaga,
  computeFlyEmissionsSaga,
} from '../../../carbon/application/usecases';

import { checkCustomerStatusSaga } from '../../../kyc/application/usecases';

export function* rootSaga(httpConnection: HttpConnection) {
  yield all([
    initializeApplicationSaga(),
    loadStorageSaga(),
    showUnknownErrorSaga(),
    loginSaga(httpConnection),
    closeLoginModalSaga(),
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
    computeHouseEmissionsSaga(),
    computeTransportEmissionsSaga(),
    computeFoodEmissionsSaga(),
    computeFlyEmissionsSaga(),
    checkCustomerStatusSaga(httpConnection),
  ]);
}
