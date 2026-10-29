/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, select, StrictEffect, takeEvery } from 'redux-saga/effects';
import { HOUSE_STATUS, House, ISearchHouseQuery } from '@clean-rn/carbon/domain';
import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { FootprintApi } from '@clean-rn/carbon/infrastructure';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { ensureTokenRefreshed } from '../../../../shared/application/usecases/ensureTokenRefreshed';
import { selectUser } from '../../../../user/application/state-management/selectors';

import { houseCreated, ICarbonTypes, initializeCarbon } from '../../commands';

export function* getHouseSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(ICarbonTypes.GET_HOUSE, getHouseGenerator, httpConnection);
}

export function* getHouseGenerator(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  try {
    yield call(ensureTokenRefreshed, httpConnection);

    const footprintApi = FootprintApi.getInstance(httpConnection);

    const user = yield select(selectUser);
    // check if house already exists
    const query: ISearchHouseQuery = {
      userId: user.id,
    };
    let house: House = yield call([footprintApi, footprintApi.searchHouse], query);
    if (!house) {
      house = yield call([footprintApi, footprintApi.createHouse], {
        userId: user.id,
        houseStatus: HOUSE_STATUS.OCCUPIED,
      });
    }

    yield put(houseCreated(house));
  } catch (error: any) {
    console.log(error);
    yield put(initializeCarbon());
    yield put(showUnknownError(error as Error));
  }
}
