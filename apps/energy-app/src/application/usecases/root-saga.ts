import { all, take, fork, call } from 'redux-saga/effects';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware, { SagaIterator } from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from '@sentry/react-native';
import { showUnknownErrorSaga } from './manage-global-errors';
import { initializeApplicationSaga } from './initialize-application';
import { HttpConnection } from '@clean-rn/shared/infrastructure';

// import { loginSaga } from './auth';

import { rootReducer } from '../state-management/reducers/root-reducer';

import { IAuthTypes, IStoreKey } from '../../application/types';
import { loginSaga } from '../../application/usecases/login';

const httpConnection = HttpConnection.getInstance(
  process.env.EXPO_PUBLIC_BASE_URL_API || 'http://localhost:3000',
);

const persistConfig = {
  key: IStoreKey.ROOT_REDUCER,
  storage: AsyncStorage,
  whitelist: ['auth'],
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

export const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
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
}

function* rootSaga(httpConnection: HttpConnection): SagaIterator {
  // fork launch a background task, yield fork calls it
  const sagas = [
    call(initializeApplicationSaga),
    call(showUnknownErrorSaga),
    call(loginSaga, httpConnection),
  ];
  // here we watch if action logout is launched in the store
  yield fork(watchLogout);
  yield all(sagas);
}
