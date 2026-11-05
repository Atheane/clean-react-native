import { ISensor, SENSOR_TYPE } from '../types';
import { ICheckAnswerCommand } from '../commands';
import { Quiz } from '../entity/Quiz';
import { PriceComfortVO, MeasurementVO } from '../value-objects';

export interface IEnergyRepository {
  getSensors: () => Promise<ISensor[] | void>;
  getQuiz: () => Promise<Quiz>;
  getPriceComfort: () => Promise<PriceComfortVO[]>;
  getRewards: () => Promise<number>;
  getMeasurement: (sensorType: SENSOR_TYPE) => Promise<MeasurementVO>;
  checkAnswer: (command: ICheckAnswerCommand) => Promise<boolean>;
}
