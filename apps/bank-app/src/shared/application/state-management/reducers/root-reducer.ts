import { combineReducers } from 'redux';

import { authReducer } from '../../../../auth/application/state-management/reducer';

import { userReducer } from '../../../../user/application/state-management/reducer';

import { accountsReducer } from '../../../../account/application/state-management/accounts/reducer';
import { eventCardsReducer } from '../../../../account/application/state-management/event-cards/reducer';

import { transactionsReducer } from '../../../../transaction/application/state-management/reducer';

import { beneficiaryReducer } from '../../../../beneficiary/application/state-management/beneficiary/reducer';
import { contactReducer } from '../../../../beneficiary/application/state-management/contact/reducer';

import { footprintReducer } from '../../../../footprint/application/state-management/reducer';

import { customerReducer } from '../../../../kyc/application/state-management/reducer';

import { deviceReducer } from '../../../../device/application/state-management/reducer';

import { initializationReducer } from './initialize-application';
import { globalErrorReducer } from './manage-global-errors';
import { cardReducer } from '../../../../card/application/state-management/reducer';
import { energyReducer } from '../../../../energy/application/state-management/reducer';

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
  footprint: footprintReducer,
  customer: customerReducer,
  device: deviceReducer,
  card: cardReducer,
  energy: energyReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
