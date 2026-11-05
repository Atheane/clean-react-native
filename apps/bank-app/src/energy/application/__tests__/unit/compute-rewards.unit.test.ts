/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

import { DomainEventManager } from '@clean-rn/ddd';
import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { Energy, Quiz, ENERGY_EVENTS } from '@clean-rn/energy/domain';

import { EnergyApi } from '@clean-rn/energy/infrastructure';

import { computeRewardsSaga, computeRewardsGenerator } from '../../usecases/compute-rewards';
import { IEnergyTypes } from '../../commands';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import { createMockHttpConnection, mockInfrastructure } from '../helpers/setup';
import { mockUser, mockQuizData } from '../fixtures/mock-data';
import { selectEnergy } from '../../state-management/selectors';

describe('ComputeRewards - usecase', () => {
  let httpConnection: HttpConnection;
  const mockEnergyAnswerCorrect = Energy.Create({ userId: mockUser.id });
  const mockEnergyAnswerIncorrect = Energy.Create({ userId: mockUser.id });
  const domainManagerInstance = DomainEventManager.getInstance();
  mockEnergyAnswerCorrect.properties.currentQuiz = Quiz.Create({
    ...mockQuizData,
    quizId: mockQuizData.quizId.toString(),
    theme: mockQuizData.theme,
  });
  mockEnergyAnswerCorrect.checkAnswer(true);
  mockEnergyAnswerIncorrect.checkAnswer(false);
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

  it('Should wait for COMPUTE_REWARDS action and call computeRewardsGenerator, should be done on next iteration', () => {
    const genObject = computeRewardsSaga();
    expect(genObject.next().value).toEqual(takeEvery(IEnergyTypes.COMPUTE_REWARDS, computeRewardsGenerator));
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should  compute rewards if correct answer', async () => {
    testSaga(computeRewardsGenerator).next().select(selectEnergy).next(mockEnergyAnswerCorrect);

    expect(domainManagerInstance.emit<Energy>).toHaveBeenCalledWith(
      ENERGY_EVENTS.REWARDS_COMPUTED,
      expect.objectContaining({
        properties: expect.objectContaining({
          userId: mockUser.id,
          currentQuiz: undefined,
          currentAnswerIsCorrect: true,
          totalRewards: 0.5,
        }),
      }),
    );
  });

  it('Should compute rewards if incorrect answer', async () => {
    testSaga(computeRewardsGenerator).next().select(selectEnergy).next(mockEnergyAnswerIncorrect);

    expect(domainManagerInstance.emit<Energy>).toHaveBeenCalledWith(
      ENERGY_EVENTS.REWARDS_COMPUTED,
      expect.objectContaining({
        properties: expect.objectContaining({
          userId: mockUser.id,
          currentQuiz: undefined,
          currentAnswerIsCorrect: false,
          totalRewards: 0,
        }),
      }),
    );
  });
});
