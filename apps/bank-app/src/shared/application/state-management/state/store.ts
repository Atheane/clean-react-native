import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as Sentry from '@sentry/react-native';

import { Logger } from '@clean-rn/logger';

import { rootReducer } from '../reducers/root-reducer';
import { rootSaga } from '../../usecases/root-saga';

const sagaMiddleware = createSagaMiddleware({
  onError: (error, errorInfos) => {
    Logger.getInstance().error(error, errorInfos);
    Sentry.captureException(new Error(error.message, errorInfos as ErrorOptions)); //errorInfos contains information on which sagaStack the error comes from
  },
});

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
