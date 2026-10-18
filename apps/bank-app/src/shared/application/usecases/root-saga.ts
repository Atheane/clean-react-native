import { all } from 'redux-saga/effects';

import { initializationSaga } from './initialization';
import {
  loginSaga,
  resetPasswordSaga,
  checkEmailSaga,
  registerIdentitySaga,
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
    initializationSaga(),
    loginSaga(httpConnection),
    resetPasswordSaga(httpConnection),
    checkEmailSaga(httpConnection),
    registerIdentitySaga(),
    // navigatePasswordToLoginSaga(),
    // getAccountsSaga(accountApi),
    // getTransactionsSaga(accountApi),
    // houseEmissionsSaga(),
    // transportEmissionsSaga(),
    // foodEmissionsSaga(),
    // flyEmissionsSaga(),
  ]);
}
