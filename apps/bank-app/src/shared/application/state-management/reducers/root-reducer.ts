import { combineReducers } from 'redux';
import { initializationReducer } from './initialization';
import {
  loginReducer,
  resetPasswordReducer,
  signupReducer,
} from '../../../../auth/application/state-management';

// import { getAccountsReducer, getTransactionsReducer } from '@account/infrastructure/redux';
// import {
//   houseEmissionsReducer,
//   transportEmissionsReducer,
//   foodEmissionsReducer,
//   flyEmissionsReducer,
// } from '@carbon/infrastructure/redux';

export const rootReducer = combineReducers({
  initialization: initializationReducer,
  auth: combineReducers({
    login: loginReducer,
    resetPassword: resetPasswordReducer,
    signup: signupReducer,
    // account: combineReducers({ accounts: getAccountsReducer, transactions: getTransactionsReducer }),
    // carbon: combineReducers({
    //   house: houseEmissionsReducer,
    //   transport: transportEmissionsReducer,
    //   food: foodEmissionsReducer,
    //   fly: flyEmissionsReducer,
  }),
});

export type IRootState = ReturnType<typeof rootReducer>;
