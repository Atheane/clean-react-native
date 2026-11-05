/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery, select } from 'redux-saga/effects';
import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { Energy, ICheckAnswerCommand } from '@clean-rn/energy/domain';
import { EnergyRepositoryFactory } from '@clean-rn/energy/infrastructure';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { ensureTokenRefreshed } from '../../../../shared/application/usecases/ensureTokenRefreshed';

import { IEnergyTypes } from '../../commands';
import { selectEnergy } from '../../state-management/selectors';

export function* checkAnswerSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(IEnergyTypes.CHECK_ANSWER, checkAnswerGenerator, httpConnection);
}

export function* checkAnswerGenerator(
  httpConnection: HttpConnection,
  {
    payload,
  }: {
    type: string;
    payload: ICheckAnswerCommand;
  },
): Generator<StrictEffect, any, any> {
  try {
    yield call(ensureTokenRefreshed, httpConnection);
    const energy: Energy = yield select(selectEnergy);
    const energyRepository = EnergyRepositoryFactory.getRepository(httpConnection);
    const isCorrect: boolean = yield call([energyRepository, energyRepository.checkAnswer], payload);
    energy.checkAnswer(isCorrect);
  } catch (error: unknown) {
    yield put(showUnknownError(error as Error));
  }
}
