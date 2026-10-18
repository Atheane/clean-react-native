import { all } from 'redux-saga/effects';

import { loadStorageSaga, navigateToSaga, navigateBackSaga } from './usecases';
// import {
//   loginSaga,
//   resetPasswordSaga,
//   navigatePasswordToLoginSaga,
//   signupStep1Saga,
//   signupStep2Saga,
//   signupStep3Saga,
//   signupStep4Saga,
//   signupStep5Saga,
//   signupStep7Saga,
//   signupStep8Saga,
// } from '@auth/usecases';
// import { authApi } from '@auth/infrastructure/services';

// import { getAccountsSaga, getTransactionsSaga } from '@account/usecases';
// import { accountApi } from '@account/infrastructure/services';

// import {
//   houseEmissionsSaga,
//   transportEmissionsSaga,
//   foodEmissionsSaga,
//   flyEmissionsSaga,
// } from '@carbon/usecases';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function* rootSaga() {
  yield all([
    loadStorageSaga(),
    navigateToSaga(),
    navigateBackSaga(),
    // loginSaga(authApi),
    // resetPasswordSaga(authApi),
    // navigatePasswordToLoginSaga(),
    // signupStep1Saga(authApi),
    // signupStep2Saga(authApi),
    // signupStep3Saga(authApi),
    // signupStep4Saga(),
    // signupStep5Saga(authApi),
    // signupStep7Saga(),
    // signupStep8Saga(),
    // getAccountsSaga(accountApi),
    // getTransactionsSaga(accountApi),
    // houseEmissionsSaga(),
    // transportEmissionsSaga(),
    // foodEmissionsSaga(),
    // flyEmissionsSaga(),
  ]);
}
