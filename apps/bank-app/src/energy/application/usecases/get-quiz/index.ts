/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery, select } from 'redux-saga/effects';
import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { Quiz, Energy } from '@clean-rn/energy/domain';
import { EnergyRepositoryFactory } from '@clean-rn/energy/infrastructure';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { ensureTokenRefreshed } from '../../../../shared/application/usecases/ensureTokenRefreshed';

import { IEnergyTypes } from '../../commands';
import { selectEnergy } from '../../state-management/selectors';

export function* getQuizSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(IEnergyTypes.GET_QUIZ, getQuizGenerator, httpConnection);
}

export function* getQuizGenerator(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  try {
    yield call(ensureTokenRefreshed, httpConnection);

    const energy: Energy = yield select(selectEnergy);

    const energyRepository = EnergyRepositoryFactory.getRepository(httpConnection);
    const quiz: Quiz = yield call([energyRepository, energyRepository.getQuiz]);
    energy.setCurrentQuiz(quiz);
  } catch (error: unknown) {
    yield put(showUnknownError(error as Error));
  }
}
