/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery, select } from 'redux-saga/effects';
import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { Energy, IEnergyConsumption, PriceComfortVO } from '@clean-rn/energy/domain';
import { EnergyRepositoryFactory } from '@clean-rn/energy/infrastructure';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { ensureTokenRefreshed } from '../../../../shared/application/usecases/ensureTokenRefreshed';

import { IEnergyTypes, initializeEnergy } from '../../commands';
import { selectEnergy } from '../../state-management/selectors';

export function* getConsumptionSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(IEnergyTypes.GET_CONSUMPTIONS, getConsumptionGenerator, httpConnection);
}

export function* getConsumptionGenerator(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  try {
    yield call(ensureTokenRefreshed, httpConnection);

    const reduxEnergy = yield select(selectEnergy);
    const energy = Energy.Restore(reduxEnergy);

    const energyRepository = EnergyRepositoryFactory.getRepository(httpConnection);

    const consumptions: IEnergyConsumption[] = yield call([
      energyRepository,
      energyRepository.getConsumptions,
    ]);

    energy.updateConsumptions(consumptions);

    const monthlyPC: PriceComfortVO[] = yield call([
      energyRepository,
      energyRepository.getPriceComfortMonthly,
    ]);

    energy.addPriceComfortMonthly(monthlyPC);
  } catch (error: unknown) {
    console.log('error', error);
    yield put(initializeEnergy());
    yield put(showUnknownError(error as Error));
  }
}
