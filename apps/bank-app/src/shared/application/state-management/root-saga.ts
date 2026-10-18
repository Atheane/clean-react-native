import { all } from 'redux-saga/effects';
import Constants from 'expo-constants';
import {
  loginSaga,
  // resetPasswordSaga,
  // navigatePasswordToLoginSaga,
  // signupStep1Saga,
  // signupStep2Saga,
  // signupStep3Saga,
  // signupStep4Saga,
  // signupStep5Saga,
  // signupStep7Saga,
  // signupStep8Saga,
} from '../../../auth/application/usecases';
import { AuthApi } from '@clean-rn/auth/infrastructure';

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
    loginSaga(new AuthApi(Constants.expoConfig?.extra?.BASE_URL as string)),
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
