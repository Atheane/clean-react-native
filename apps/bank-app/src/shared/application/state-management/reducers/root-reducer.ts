import { combineReducers } from 'redux';
import { initializationReducer } from './initialization';
import {
  loginReducer,
  resetPasswordReducer,
  signupReducer,
} from '../../../../auth/application/state-management';

// import {
//   signupStep1Reducer,
//   signupStep2Reducer,
//   signupStep3Reducer,
//   signupStep4Reducer,
//   signupStep5Reducer,
//   signupStep7Reducer,
//   signupStep8Reducer,
// } from '@auth/infrastructure/redux';
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
    //   signupStep1: signupStep1Reducer,
    //   signupStep2: signupStep2Reducer,
    //   signupStep3: signupStep3Reducer,
    //   signupStep4: signupStep4Reducer,
    //   signupStep5: signupStep5Reducer,
    //   signupStep7: signupStep7Reducer,
    //   signupStep8: signupStep8Reducer,
    // }),
    // account: combineReducers({ accounts: getAccountsReducer, transactions: getTransactionsReducer }),
    // carbon: combineReducers({
    //   house: houseEmissionsReducer,
    //   transport: transportEmissionsReducer,
    //   food: foodEmissionsReducer,
    //   fly: flyEmissionsReducer,
  }),
});

export type IRootState = ReturnType<typeof rootReducer>;
