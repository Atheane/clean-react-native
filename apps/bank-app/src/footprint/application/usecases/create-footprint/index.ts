/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, cancel, put, select, StrictEffect, takeEvery } from 'redux-saga/effects';
import { FootprintError, FootprintVO, ICreateFootprintCommand } from '@clean-rn/footprint/domain';
import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { FootprintApi } from '@clean-rn/footprint/infrastructure';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { ensureTokenRefreshed } from '../../../../shared/application/usecases/ensureTokenRefreshed';

import { IFootprintTypes, footprintNotCreated, initializeFootprint, footprintCreated } from '../../commands';
import { mapFootprintPropsToDomain } from '../../mappers';
import { IFootprintProps } from '../../../presentation/types';
import { selectUser } from '../../../../user/application/state-management/selectors';

export function* createFootprintSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(IFootprintTypes.CREATE_FOOTPRINT, createFootprintGenerator, httpConnection);
}

export function* createFootprintGenerator(
  httpConnection: HttpConnection,
  {
    payload,
  }: {
    type: string;
    payload: IFootprintProps;
  },
): Generator<StrictEffect, any, any> {
  try {
    // validation du formulaire
    const footprintVO: FootprintVO = yield call(mapFootprintPropsToDomain, payload);

    yield call(ensureTokenRefreshed, httpConnection);

    const footprintApi = FootprintApi.getInstance(httpConnection);

    const user = yield select(selectUser);

    const cmd: ICreateFootprintCommand = {
      userId: user.id,
      footprint: footprintVO,
    };
    // check if house already exists
    const footprint = yield call([footprintApi, footprintApi.createFootprint], cmd);

    yield put(footprintCreated(footprint));
  } catch (error: any) {
    console.log(error);
    yield put(initializeFootprint());
    if (
      error instanceof FootprintError.InvalidAdultNumber ||
      error instanceof FootprintError.InvalidChildNumber
    ) {
      yield put(footprintNotCreated(error));
      yield cancel();
    } else if (error instanceof ServerError && error.statusCode === 400) {
      yield put(footprintNotCreated(new FootprintError.HouseholdAlreadyDeclared()));
      yield cancel();
    }
    yield put(showUnknownError(error as Error));
  }
}
