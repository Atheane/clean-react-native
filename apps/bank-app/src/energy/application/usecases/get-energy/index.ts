/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery, select } from 'redux-saga/effects';
import { HttpConnection, IServerError, ServerError } from '@clean-rn/shared/infrastructure';
import { User } from '@clean-rn/user/domain';
import { Energy, ISensor, MeasurementVO, PriceComfortVO, SENSOR_TYPE } from '@clean-rn/energy/domain';
import { EnergyApi } from '@clean-rn/energy/infrastructure';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { ensureTokenRefreshed } from '../../../../shared/application/usecases/ensureTokenRefreshed';
import { selectUser } from '../../../../user/application/state-management/selectors';

import { IEnergyTypes, initializeEnergy } from '../../commands';
import { selectEnergy } from '../../state-management/selectors';

export function* getEnergySaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(IEnergyTypes.GET_ENERGY, getEnergyGenerator, httpConnection);
}

export function* getEnergyGenerator(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  try {
    yield call(ensureTokenRefreshed, httpConnection);

    const user: User = yield select(selectUser);
    let energy: Energy = yield select(selectEnergy);

    if (!energy) {
      energy = Energy.Create({ userId: user.id });
    }

    const energyApi = EnergyApi.getInstance(httpConnection);
    const sensors: ISensor[] = yield call([energyApi, energyApi.getSensors]);
    energy.checkAvailableSensors(sensors);
    const uniqueSensorTypes = new Set<SENSOR_TYPE>();
    for (const sensor of sensors) {
      uniqueSensorTypes.add(sensor.type);
    }
    const sensorTypes = Array.from(uniqueSensorTypes);
    if (sensorTypes.length > 0) {
      for (const sensorType of sensorTypes) {
        const measurement: MeasurementVO = yield call([energyApi, energyApi.getMeasurement], sensorType);
        energy.addMesurement(measurement);
      }
    }
    const priceComforts: PriceComfortVO[] = yield call([energyApi, energyApi.getPriceComfort]);
    energy.addPricesComfort(priceComforts);
  } catch (error: unknown) {
    yield put(initializeEnergy());
    yield put(showUnknownError(error as Error));
  }
}
