import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as Sentry from '@sentry/react-native';
import Constants from 'expo-constants';
import { Logger } from '@clean-rn/logger';

import { rootReducer } from '../reducers/root-reducer';
import { rootSaga } from '../../usecases/root-saga';
import { HttpConnection } from '@clean-rn/shared/infrastructure';

const sagaMiddleware = createSagaMiddleware({
  onError: (error, errorInfos) => {
    Logger.getInstance().error(error);
    Logger.getInstance().error(errorInfos);
    Sentry.captureException(new Error(error.message, errorInfos as ErrorOptions)); //errorInfos contains information on which sagaStack the error comes from
  },
});

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga, HttpConnection.getInstance(Constants.expoConfig?.extra?.BASE_URL_API));
