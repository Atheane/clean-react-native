import { combineReducers } from 'redux';

import {
  loginReducer,
  resetPasswordReducer,
  signupReducer,
} from '../../../../auth/application/state-management';

import { accountsReducer, transactionsReducer } from '../../../../account/application/state-management';

// import {
//   houseEmissionsReducer,
//   transportEmissionsReducer,
//   foodEmissionsReducer,
//   flyEmissionsReducer,
// } from '@carbon/infrastructure/redux';

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
  carbon: combineReducers({
    house: () => {
      return {
        footprint: 0,
        average: 0,
      };
    },
    transport: () => {
      return {
        footprint: 0,
        average: 0,
      };
    },
    food: () => {
      return {
        footprint: 0,
        average: 0,
      };
    },
    fly: () => {
      return {
        footprint: 0,
        average: 0,
      };
    },
  }),
});

export type IRootState = ReturnType<typeof rootReducer>;
