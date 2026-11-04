import { Energy } from '@clean-rn/energy/domain';

export enum IEnergyTypes {
  INITIALIZE_ENERGY = 'INITIALIZE_ENERGY',
  GET_ENERGY = 'GET_ENERGY',
  ENERGY_DOMAIN_EVENT = 'ENERGY_DOMAIN_EVENT',
}

export type IInitializeEnergy = {
  type: typeof IEnergyTypes.INITIALIZE_ENERGY;
};

export type IGetEnergy = {
  type: typeof IEnergyTypes.GET_ENERGY;
};

export type IEnergyDomainEvent = {
  type: typeof IEnergyTypes.ENERGY_DOMAIN_EVENT;
  payload: {
    energy: Energy;
  };
};

export type IEnergyActions = IInitializeEnergy | IGetEnergy | IEnergyDomainEvent;
