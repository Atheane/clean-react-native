import { all, take, fork, put, call } from 'redux-saga/effects';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware, { SagaIterator } from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from '@sentry/react-native';
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
  updateLanguageSaga,
  deleteUserAccountSaga,
  updateUserSaga,
} from '../../../user/application/usecases';

import { initializeAccounts } from '../../../account/application/commands/accounts';
import { listAccountsSaga } from '../../../account/application/usecases';
import { initializeTransactionsList } from '../../../transaction/application/commands';
import { listTransactionsSaga } from '../../../transaction/application/usecases';

import {
  computeHouseEmissionsSaga,
  computeTransportEmissionsSaga,
  computeFoodEmissionsSaga,
  computeFlyEmissionsSaga,
  createFootprintSaga,
  getHouseSaga,
  addHeatersSaga,
  addWorksSaga,
  getTransportSaga,
  addVehiclesSaga,
  getFootprintSaga,
} from '../../../footprint/application/usecases';

import { registerDeviceSaga } from '../../../device/application/usecases/register-device';
import { initializeDevice } from '../../../device/application/commands';

import { IAuthTypes, initializeAuth } from '../../../auth/application/commands';

import { rootReducer } from '../state-management/reducers/root-reducer';
import {
  initializeFootprint,
  initializeFlyEmissions,
  initializeFoodEmissions,
  initializeHouseEmissions,
  initializeTransportEmissions,
} from '../../../footprint/application/commands';

import { initializeUser } from '../../../user/application/commands';
import { IStoreKey } from '../../../shared/application/types';
import { createDomainEventsMiddleware } from '../state-management/middleware/domain-events.middleware';
import { energyDomainEventsConfig } from '../../../energy/application/state-management/domain-events.config';
import {
  getEnergySaga,
  getQuizSaga,
  checkAnswerSaga,
  computeRewardsSaga,
  getConsumptionSaga,
} from '../../../energy/application/usecases';

const httpConnection = HttpConnection.getInstance(
  process.env.EXPO_PUBLIC_BASE_URL_API || 'http://localhost:3000',
);

const persistConfig = {
  key: IStoreKey.ROOT_REDUCER,
  storage: AsyncStorage,
  whitelist: ['auth.auth', 'beneficiary.beneficiaries', 'card', 'user', 'kyc'],
  // if phone is in standby mode, usecases may use empty data from store (it depends on how background is handled, it depends on device trademark)
  // so we persist in storage all redux data that is selected in usecases
  // for security reasons, all data is purged when user is logged out
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware({
  onError: (error, errorInfos) => {
    console.log(error);
    console.log(errorInfos);
    Sentry.captureException(new Error(error.message, errorInfos as ErrorOptions)); //errorInfos contains information on which sagaStack the error comes from
  },
});

// Gather all bounded contexts configurations
const boundedContextConfigs = {
  ...energyDomainEventsConfig,
};

const domainEventsMiddleware = createDomainEventsMiddleware(boundedContextConfigs);

export const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware, domainEventsMiddleware));
export const persistor = persistStore(store);

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
  persistor.purge(); // for security reasons
  // Annuler toutes les sagas en cours lors du logout
  yield call(restartRootSaga);
  yield put(initializeAuth());
  yield put(initializeAccounts());
  yield put(initializeFlyEmissions());
  yield put(initializeHouseEmissions());
  yield put(initializeFoodEmissions());
  yield put(initializeTransportEmissions());
  yield put(initializeDevice());
  yield put(initializeTransactionsList());

  yield put(initializeUser());
  yield put(initializeFootprint());
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
    call(computeHouseEmissionsSaga, httpConnection),
    call(computeTransportEmissionsSaga, httpConnection),
    call(computeFoodEmissionsSaga, httpConnection),
    call(computeFlyEmissionsSaga, httpConnection),
    call(registerDeviceSaga, httpConnection),
    call(sessionSaga),
    // sagas requiring token refresh
    call(listAccountsSaga, httpConnection),
    call(listTransactionsSaga, httpConnection),
    call(updateNotificationsSaga, httpConnection),
    call(updateLanguageSaga, httpConnection),
    call(updateUserSaga, httpConnection),
    call(deleteUserAccountSaga, httpConnection),
    call(logoutSaga, httpConnection),
    call(getFootprintSaga, httpConnection),
    call(createFootprintSaga, httpConnection),
    call(getHouseSaga, httpConnection),
    call(addHeatersSaga, httpConnection),
    call(addWorksSaga, httpConnection),
    call(getTransportSaga, httpConnection),
    call(addVehiclesSaga, httpConnection),
    call(getEnergySaga, httpConnection),
    call(getQuizSaga, httpConnection),
    call(checkAnswerSaga, httpConnection),
    call(computeRewardsSaga),
    call(getConsumptionSaga, httpConnection),
  ];
  // here we watch if action logout is launched in the store
  yield fork(watchLogout);
  yield all(sagas);
}
