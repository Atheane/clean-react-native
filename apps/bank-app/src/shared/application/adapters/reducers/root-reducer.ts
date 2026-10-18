import { combineReducers } from 'redux';
import { navigationReducer } from './navigation-reducer';
import { storageReducer } from './storage-reducer';
// import { loginReducer, resetPasswordReducer } from '@auth/infrastructure/redux';
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
  // auth: combineReducers({
  //   login: loginReducer,
  //   resetPassword: resetPasswordReducer,
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
  // }),
  nav: navigationReducer,
  storage: storageReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
