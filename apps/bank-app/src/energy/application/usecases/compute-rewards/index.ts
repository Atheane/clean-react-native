/* eslint-disable @typescript-eslint/no-explicit-any */
import { StrictEffect, takeEvery, select } from 'redux-saga/effects';
import { Energy } from '@clean-rn/energy/domain';

import { IEnergyTypes } from '../../commands';
import { selectEnergy } from '../../state-management/selectors';

export function* computeRewardsSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(IEnergyTypes.COMPUTE_REWARDS, computeRewardsGenerator);
}

export function* computeRewardsGenerator(): Generator<StrictEffect, any, any> {
  const energyRedux: Energy = yield select(selectEnergy);
  const energy = Energy.Restore(energyRedux); // necessary because redux get rids of instance methods, not properties
  energy.computeRewards();
}
