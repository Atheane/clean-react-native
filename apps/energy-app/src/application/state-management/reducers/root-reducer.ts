import { combineReducers } from 'redux';

import { authReducer } from './auth';
import { initializationReducer } from './initialize-application';

import { globalErrorReducer } from './manage-global-errors';

export const rootReducer = combineReducers({
  unknownError: globalErrorReducer,
  initialization: initializationReducer,
  auth: authReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
