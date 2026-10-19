import { combineReducers } from 'redux';

import {
  loginReducer,
  resetPasswordReducer,
  signupReducer,
} from '../../../../auth/application/state-management';

import { accountsReducer, transactionsReducer } from '../../../../account/application/state-management';

import { carbonReducer } from '../../../../carbon/application/state-management';

import { initializationReducer } from './initialize-application';
import { globalErrorReducer } from './manage-global-errors';

export const rootReducer = combineReducers({
  initialization: initializationReducer,
  unknownError: globalErrorReducer,
  auth: combineReducers({
    login: loginReducer,
    resetPassword: resetPasswordReducer,
    signup: signupReducer,
  }),
  account: combineReducers({ accounts: accountsReducer, transactions: transactionsReducer }),
  carbon: carbonReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
