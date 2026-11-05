/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

import { DomainEventManager } from '@clean-rn/ddd';
import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { Energy, Quiz, ENERGY_EVENTS } from '@clean-rn/energy/domain';

import { EnergyApi } from '@clean-rn/energy/infrastructure';

import { getQuizSaga, getQuizGenerator } from '../../usecases/get-quiz';
import { IEnergyTypes } from '../../commands';

import { ensureTokenRefreshed } from '../../../../shared/application/usecases/ensureTokenRefreshed';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { selectUser } from '../../../../user/application/state-management/selectors';

import { createMockHttpConnection, mockInfrastructure } from '../helpers/setup';
import { mockUser, mockQuizData } from '../fixtures/mock-data';
import { selectEnergy } from '../../state-management/selectors';

describe('GetQuiz - usecase', () => {
  let httpConnection: HttpConnection;
  let api: EnergyApi;
  const mockEnergy = Energy.Create({ userId: mockUser.id });
  const domainManagerInstance = DomainEventManager.getInstance();
  const mockQuiz = Quiz.Create({
    ...mockQuizData,
    quizId: mockQuizData.quizId.toString(),
    theme: mockQuizData.theme,
  });
  beforeEach(() => {
    httpConnection = createMockHttpConnection();
    mockInfrastructure();
    api = EnergyApi.getInstance(httpConnection);
    jest.spyOn(domainManagerInstance, 'emit').mockImplementation((eventName: string, data: Energy) => {
      console.log('Event émis:', eventName);
      console.log('Data:', JSON.stringify(data, null, 2));
      return true;
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('Should wait for GET_QUIZ action and call getQuizGenerator, should be done on next iteration', () => {
    const genObject = getQuizSaga(httpConnection);
    expect(genObject.next().value).toEqual(
      takeEvery(IEnergyTypes.GET_QUIZ, getQuizGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should getQuiz if it exists and populate it with existing sensors and measurements', async () => {
    testSaga(getQuizGenerator, httpConnection)
      .next()
      .select(selectUser)
      .next(mockUser)
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .select(selectEnergy)
      .next(mockEnergy)
      .call([api, api.getQuiz], mockUser.properties.config?.lang)
      .next(mockQuiz);

    expect(domainManagerInstance.emit<Energy>).toHaveBeenCalledWith(
      ENERGY_EVENTS.CURRENT_QUIZ_SET,
      expect.objectContaining({
        properties: expect.objectContaining({
          userId: mockUser.id,
          currentQuiz: mockQuiz,
        }),
      }),
    );
  });

  it('Should getQuiz if no current quiz', async () => {
    testSaga(getQuizGenerator, httpConnection)
      .next()
      .select(selectUser)
      .next(mockUser)
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .select(selectEnergy)
      .next(mockEnergy)
      .call([api, api.getQuiz], mockUser.properties.config?.lang)
      .next(null);
  });

  it('Should call showUnknownError action if unknown error', () => {
    testSaga(getQuizGenerator, httpConnection)
      .next()
      .throw(new Error('unknown error'))
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
