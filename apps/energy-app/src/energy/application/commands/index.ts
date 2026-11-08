import {
  IEnergyActions,
  IEnergyTypes,
  IGetEnergy,
  IInitializeEnergy,
  IGetQuiz,
  ICheckAnswer,
  IComputeRewards,
  IGetConsumptions,
} from './types';

export const initializeEnergy = (): IInitializeEnergy => ({
  type: IEnergyTypes.INITIALIZE_ENERGY,
});

export const getEnergy = (): IGetEnergy => ({
  type: IEnergyTypes.GET_ENERGY,
});

export const getQuiz = (): IGetQuiz => ({
  type: IEnergyTypes.GET_QUIZ,
});

export const checkAnswer = (payload: { quizId: string; answerIdx: number }): ICheckAnswer => ({
  type: IEnergyTypes.CHECK_ANSWER,
  payload,
});

export const computeRewards = (): IComputeRewards => ({
  type: IEnergyTypes.COMPUTE_REWARDS,
});

export const getConsumptions = (): IGetConsumptions => ({
  type: IEnergyTypes.GET_CONSUMPTIONS,
});

export { IEnergyActions, IEnergyTypes };
