import { IEnergyActions, IEnergyTypes, IGetEnergy, IInitializeEnergy } from './types';

export const initializeEnergy = (): IInitializeEnergy => ({
  type: IEnergyTypes.INITIALIZE_ENERGY,
});

export const getEnergy = (): IGetEnergy => ({
  type: IEnergyTypes.GET_ENERGY,
});

export { IEnergyActions, IEnergyTypes };
