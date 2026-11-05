/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

import { DomainEventManager } from '@clean-rn/ddd';
import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { Energy, Quiz, ENERGY_EVENTS } from '@clean-rn/energy/domain';

import { EnergyApi } from '@clean-rn/energy/infrastructure';

import { checkAnswerSaga, checkAnswerGenerator } from '../../usecases/check-answer';
import { IEnergyTypes } from '../../commands';

import { ensureTokenRefreshed } from '../../../../shared/application/usecases/ensureTokenRefreshed';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import { createMockHttpConnection, mockInfrastructure } from '../helpers/setup';
import { mockUser, mockQuizData } from '../fixtures/mock-data';
import { selectEnergy } from '../../state-management/selectors';

describe('CheckAnswer - usecase', () => {
  let httpConnection: HttpConnection;
  let api: EnergyApi;
  const mockEnergy = Energy.Create({ userId: mockUser.id });
  const domainManagerInstance = DomainEventManager.getInstance();
  mockEnergy.properties.currentQuiz = Quiz.Create({
    ...mockQuizData,
    quizId: mockQuizData.quizId.toString(),
    theme: mockQuizData.theme,
  });
  const mockCheckAnswerCommand = {
    quizId: mockQuizData.quizId.toString(),
    answerIdx: 0,
  };
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

  it('Should wait for CHECK_ANSWER action and call checkAnswerGenerator, should be done on next iteration', () => {
    const genObject = checkAnswerSaga(httpConnection);
    expect(genObject.next().value).toEqual(
      takeEvery(IEnergyTypes.CHECK_ANSWER, checkAnswerGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should checkAnswer and compute correct reward if correct answer', async () => {
    testSaga(checkAnswerGenerator, httpConnection, {
      type: IEnergyTypes.CHECK_ANSWER,
      payload: mockCheckAnswerCommand,
    })
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .select(selectEnergy)
      .next(mockEnergy)
      .call([api, api.checkAnswer], mockCheckAnswerCommand)
      .next(true);

    expect(domainManagerInstance.emit<Energy>).toHaveBeenCalledWith(
      ENERGY_EVENTS.ANSWER_CHECKED,
      expect.objectContaining({
        properties: expect.objectContaining({
          userId: mockUser.id,
          currentQuiz: mockEnergy.properties.currentQuiz,
          currentAnswerIsCorrect: true,
          totalRewards: 0,
        }),
      }),
    );
  });

  it('Should checkAnswer and compute correct reward if incorrect answer', async () => {
    testSaga(checkAnswerGenerator, httpConnection, {
      type: IEnergyTypes.CHECK_ANSWER,
      payload: mockCheckAnswerCommand,
    })
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .select(selectEnergy)
      .next(mockEnergy)
      .call([api, api.checkAnswer], mockCheckAnswerCommand)
      .next(false);

    expect(domainManagerInstance.emit<Energy>).toHaveBeenCalledWith(
      ENERGY_EVENTS.ANSWER_CHECKED,
      expect.objectContaining({
        properties: expect.objectContaining({
          userId: mockUser.id,
          currentQuiz: mockEnergy.properties.currentQuiz,
          currentAnswerIsCorrect: false,
          totalRewards: 0,
        }),
      }),
    );
  });

  it('Should call showUnknownError action if unknown error', () => {
    testSaga(checkAnswerGenerator, httpConnection, {
      type: IEnergyTypes.CHECK_ANSWER,
      payload: mockCheckAnswerCommand,
    })
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .select(selectEnergy)
      .next(mockEnergy)
      .call([api, api.checkAnswer], mockCheckAnswerCommand)
      .throw(new Error('unknown error'))
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
