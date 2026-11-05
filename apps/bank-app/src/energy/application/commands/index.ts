import { IEnergyActions, IEnergyTypes, IGetEnergy, IInitializeEnergy, IGetQuiz } from './types';

export const initializeEnergy = (): IInitializeEnergy => ({
  type: IEnergyTypes.INITIALIZE_ENERGY,
});

export const getEnergy = (): IGetEnergy => ({
  type: IEnergyTypes.GET_ENERGY,
});

export const getQuiz = (): IGetQuiz => ({
  type: IEnergyTypes.GET_QUIZ,
});

export { IEnergyActions, IEnergyTypes };
