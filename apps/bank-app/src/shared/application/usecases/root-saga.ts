import { all } from 'redux-saga/effects';
import { initializationSaga } from './initialization';
import {
  loginSaga,
  resetPasswordSaga,
  // navigatePasswordToLoginSaga,
  // signupStep1Saga,
  // signupStep2Saga,
  // signupStep3Saga,
  // signupStep4Saga,
  // signupStep5Saga,
  // signupStep7Saga,
  // signupStep8Saga,
} from '../../../auth/application/usecases';

// import { getAccountsSaga, getTransactionsSaga } from '@account/usecases';
// import { accountApi } from '@account/infrastructure/services';

// import {
//   houseEmissionsSaga,
//   transportEmissionsSaga,
//   foodEmissionsSaga,
//   flyEmissionsSaga,
// } from '@carbon/usecases';

export function* rootSaga() {
  yield all([
    initializationSaga(),
    loginSaga(),
    resetPasswordSaga(),
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
