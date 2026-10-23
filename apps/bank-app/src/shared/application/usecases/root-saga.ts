import { all, take, fork, put, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { initializeApplicationSaga } from './initialize-application';
import { loadStorageSaga } from './load-storage';
import { showUnknownErrorSaga } from './manage-global-errors';

import { HttpConnection } from '@clean-rn/shared/infrastructure';

import {
  loginSaga,
  closeLoginModalSaga,
  resetPasswordSaga,
  logoutSaga,
  refreshSaga,
  sessionSaga,
} from '../../../auth/application/usecases';

import {
  checkEmailSaga,
  registerIdentitySaga,
  registerPasswordSaga,
  checkPhoneSaga,
  registerBirthSaga,
  registerAddressSaga,
  validatePhoneSaga,
  signupUserSaga,
  updateNotificationsSaga,
  deleteUserAccountSaga,
} from '../../../user/application/usecases';

import { listAccountsSaga } from '../../../account/application/usecases';
import {
  listTransactionsSaga,
  transferSaga,
  payoutSaga,
  transactionWaitingSaga,
} from '../../../transaction/application/usecases';

import {
  addBeneficiarySaga,
  deleteBeneficiarySaga,
  listBeneficiarySaga,
} from '../../../beneficiary/application/usecases';
import { addContactSaga, listContactSaga } from '../../../beneficiary/application/usecases';

import {
  computeHouseEmissionsSaga,
  computeTransportEmissionsSaga,
  computeFoodEmissionsSaga,
  computeFlyEmissionsSaga,
} from '../../../carbon/application/usecases';

import { checkCustomerStatusSaga } from '../../../kyc/application/usecases/customer';
import {
  initializeDocumentSaga,
  addPageSaga,
  uploadDocumentSaga,
  cancelUploadSaga,
} from '../../../kyc/application/usecases/document';
import { registerDeviceSaga } from '../../../device/application/usecases/register-device';

import {
  changeCardLimitsSaga,
  toggleCardLockSaga,
  changeCardPINSaga,
} from '../../../card/application/usecases';

import { IAuthTypes, initializeAuth } from '../../../auth/application/commands';

import { initializeAccounts } from '../../../account/application/commands/accounts';

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as Sentry from '@sentry/react-native';
import Constants from 'expo-constants';

import { rootReducer } from '../state-management/reducers/root-reducer';
import { initBeneficiary } from '../../../beneficiary/application/commands/beneficiary';
import {
  initializeFlyEmissions,
  initializeFoodEmissions,
  initializeHouseEmissions,
  initializeTransportEmissions,
} from '../../../carbon/application/commands';
import { initContact } from '../../../beneficiary/application/commands/contact';
import { initCard } from '../../../card/application/commands';
import { initializeDevice } from '../../../device/application/commands';
import { initializeKyc } from '../../../kyc/application/commands/customer';
import { resetDocument } from '../../../kyc/application/commands/document';
import { initTransaction, initializeTransactionsList } from '../../../transaction/application/commands';
import { initializeUser } from '../../../user/application/commands';

const httpConnection = HttpConnection.getInstance(Constants.expoConfig?.extra?.BASE_URL_API);

const sagaMiddleware = createSagaMiddleware({
  onError: (error, errorInfos) => {
    console.log(error);
    console.log(errorInfos);
    Sentry.captureException(new Error(error.message, errorInfos as ErrorOptions)); //errorInfos contains information on which sagaStack the error comes from
  },
});

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

let rootSagaTask: any = sagaMiddleware.run(rootSaga, httpConnection);
// Fonction pour redémarrer rootSaga
const restartRootSaga = () => {
  // Annuler la tâche saga actuelle: annulle aussi toutes les sagas enfants !
  rootSagaTask.cancel();
  // Redémarrer la saga
  rootSagaTask = sagaMiddleware.run(rootSaga, httpConnection);
};

// if logout is launch in the store, cancel all tasks
// prevents 401 to occurs in sagas after logout
function* watchLogout() {
  // Écoutez l'action de logout
  yield take(IAuthTypes.LOGGED_OUT);
  // Annuler toutes les sagas en cours lors du logout
  yield call(restartRootSaga);
  yield put(initializeAccounts());
  yield put(initializeAuth());
  yield put(initBeneficiary());
  yield put(initContact());
  yield put(initializeFlyEmissions());
  yield put(initializeHouseEmissions());
  yield put(initializeFoodEmissions());
  yield put(initializeTransportEmissions());
  yield put(initCard());
  yield put(initializeDevice());
  yield put(initializeKyc());
  yield put(resetDocument());
  yield put(initializeTransactionsList());
  yield put(initTransaction());
  yield put(initializeUser());
}

function* rootSaga(httpConnection: HttpConnection): SagaIterator {
  // fork launch a background task, yield fork calls it
  const sagas = [
    call(initializeApplicationSaga),
    call(loadStorageSaga),
    call(showUnknownErrorSaga),
    call(loginSaga, httpConnection),
    call(closeLoginModalSaga),
    call(resetPasswordSaga, httpConnection),
    call(checkEmailSaga, httpConnection),
    call(registerIdentitySaga),
    call(registerPasswordSaga),
    call(checkPhoneSaga, httpConnection),
    call(registerBirthSaga),
    call(registerAddressSaga),
    call(validatePhoneSaga, httpConnection),
    call(signupUserSaga, httpConnection),
    call(refreshSaga, httpConnection),
    call(addContactSaga),
    call(listContactSaga),
    call(computeHouseEmissionsSaga),
    call(computeTransportEmissionsSaga),
    call(computeFoodEmissionsSaga),
    call(computeFlyEmissionsSaga),
    call(initializeDocumentSaga),
    call(addPageSaga),
    call(cancelUploadSaga),
    call(registerDeviceSaga, httpConnection),
    call(sessionSaga),
    // sagas requiring token refresh
    call(listAccountsSaga, httpConnection),
    call(addBeneficiarySaga, httpConnection),
    call(deleteBeneficiarySaga, httpConnection),
    call(listBeneficiarySaga, httpConnection),
    call(changeCardLimitsSaga, httpConnection),
    call(toggleCardLockSaga, httpConnection),
    call(changeCardPINSaga, httpConnection),
    call(checkCustomerStatusSaga, httpConnection),
    call(uploadDocumentSaga, httpConnection),
    call(listTransactionsSaga, httpConnection),
    call(transferSaga, httpConnection),
    call(payoutSaga, httpConnection),
    call(transactionWaitingSaga, httpConnection),

    call(updateNotificationsSaga, httpConnection),
    call(deleteUserAccountSaga, httpConnection),
    call(logoutSaga, httpConnection),
  ];
  // here we watch if action logout is launched in the store
  yield fork(watchLogout);
  yield all(sagas);
}
