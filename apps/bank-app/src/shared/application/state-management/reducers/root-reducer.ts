import { combineReducers } from 'redux';

import { authReducer } from '../../../../auth/application/state-management';

import { userReducer } from '../../../../user/application/state-management';

import { accountsReducer, eventCardsReducer } from '../../../../account/application/state-management';

import { transactionsReducer } from '../../../../transaction/application/state-management';

import { beneficiaryReducer, contactReducer } from '../../../../beneficiary/application/state-management';

import { carbonReducer } from '../../../../carbon/application/state-management';

import { customerReducer, documentReducer } from '../../../../kyc/application/state-management';
import { deviceReducer } from '../../../../device/application/state-management/reducer';

import { initializationReducer } from './initialize-application';
import { globalErrorReducer } from './manage-global-errors';

export const rootReducer = combineReducers({
  initialization: initializationReducer,
  unknownError: globalErrorReducer,
  auth: authReducer,
  user: userReducer,
  account: combineReducers({
    accounts: accountsReducer,
    deletedEventCards: eventCardsReducer,
  }),
  transaction: transactionsReducer,
  beneficiary: combineReducers({ beneficiaries: beneficiaryReducer, contacts: contactReducer }),
  carbon: carbonReducer,
  kyc: combineReducers({ customer: customerReducer, document: documentReducer }),
  device: deviceReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
