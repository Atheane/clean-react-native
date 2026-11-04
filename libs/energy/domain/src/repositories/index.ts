import { ISensor } from '../types';

export interface IEnergyRepository {
  getSensors: () => Promise<ISensor[] | void>;
}
