import { combineReducers } from 'redux';

import { authReducer } from '../../../../auth/application/state-management/reducer';

import { userReducer } from '../../../../user/application/state-management/reducer';

import { footprintReducer } from '../../../../footprint/application/state-management/reducer';

import { deviceReducer } from '../../../../device/application/state-management/reducer';

import { initializationReducer } from './initialize-application';
import { globalErrorReducer } from './manage-global-errors';
import { energyReducer } from '../../../../energy/application/state-management/reducer';

export const rootReducer = combineReducers({
  initialization: initializationReducer,
  unknownError: globalErrorReducer,
  auth: authReducer,
  user: userReducer,
  footprint: footprintReducer,
  device: deviceReducer,
  energy: energyReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
