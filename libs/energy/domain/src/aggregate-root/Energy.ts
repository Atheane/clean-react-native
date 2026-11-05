import { Entity } from '@clean-rn/ddd';
import { ENERGY_EVENTS } from '../events';
import { MeasurementVO, PriceComfortVO } from '../value-objects';
import {
  ISensor,
  MEASUREMENT_UNIT,
  PRICE_COMFORT_DATA_GRANULARITY,
  PRICE_COMFORT_TYPE,
  SENSOR_TYPE,
} from '../types';
import { Quiz } from '../entity/Quiz';

export interface IEnergyProperties {
  userId: string;
  sensors: ISensor[];
  measurements?: {
    [SENSOR_TYPE.TEMPERATURE]?: MeasurementVO;
    [SENSOR_TYPE.HUMIDITY]?: MeasurementVO;
    [SENSOR_TYPE.CO2]?: MeasurementVO;
  };
  heatingPriceComfort?: PriceComfortVO;
  coolingPriceComfort?: PriceComfortVO;
  globalPriceComfort?: PriceComfortVO | null;
  totalRewards: number;
  currentQuiz?: Quiz;
  currentChallenge?: Quiz;
  currentAnswerIsCorrect?: boolean;
  // consumption?: any;
}

// if several houses, convert Energy to HouseEnergy
export class Energy extends Entity<IEnergyProperties> {
  private constructor({ id, properties }: { id?: string } & { properties: Partial<IEnergyProperties> }) {
    super({ id, properties });
  }

  static Create({ userId }: { userId: string }): Energy {
    const energy = new Energy({
      properties: {
        userId,
        sensors: [],
        totalRewards: 0,
        globalPriceComfort: null,
      },
    });
    Energy.emitStaticDomainEvent(ENERGY_EVENTS.ENERGY_CREATED, energy);
    return energy;
  }

  checkAvailableSensors(sensors: ISensor[]): void {
    this.properties.sensors = sensors;
    Energy.emitStaticDomainEvent(ENERGY_EVENTS.SENSORS_CHECKED, this);
  }

  addMesurement(measurement: MeasurementVO): void {
    if (measurement.unit === MEASUREMENT_UNIT.CELCIUS) {
      this.properties.measurements = {
        ...this.properties.measurements,
        [SENSOR_TYPE.TEMPERATURE]: measurement,
      };
      Energy.emitStaticDomainEvent(ENERGY_EVENTS.TEMPERATURE_ADDED, this);
    } else if (measurement.unit === MEASUREMENT_UNIT.PERCENTAGE) {
      this.properties.measurements = {
        ...this.properties.measurements,
        [SENSOR_TYPE.HUMIDITY]: measurement,
      };
      Energy.emitStaticDomainEvent(ENERGY_EVENTS.HUMIDITY_ADDED, this);
    } else if (measurement.unit === MEASUREMENT_UNIT.PPM) {
      this.properties.measurements = {
        ...this.properties.measurements,
        [SENSOR_TYPE.CO2]: measurement,
      };
      Energy.emitStaticDomainEvent(ENERGY_EVENTS.CO2_ADDED, this);
    }
  }

  addPricesComfort(pricesComfort: PriceComfortVO[]): void {
    const findPriceComfortByTypeAndGranularity = (type: PRICE_COMFORT_TYPE) => {
      return (
        pricesComfort.find(
          (pc) => pc.type === type && pc.granularity === PRICE_COMFORT_DATA_GRANULARITY.INSTANT,
        ) ||
        pricesComfort.find(
          (pc) => pc.type === type && pc.granularity === PRICE_COMFORT_DATA_GRANULARITY.DAILY,
        ) ||
        pricesComfort.find(
          (pc) => pc.type === type && pc.granularity === PRICE_COMFORT_DATA_GRANULARITY.MONTHLY,
        )
      );
    };

    const heatingPriceComfort = findPriceComfortByTypeAndGranularity(PRICE_COMFORT_TYPE.HEATING);
    const coolingPriceComfort = findPriceComfortByTypeAndGranularity(PRICE_COMFORT_TYPE.COOLING);
    const globalPriceComfort = findPriceComfortByTypeAndGranularity(PRICE_COMFORT_TYPE.ALL);

    this.properties.heatingPriceComfort = heatingPriceComfort;
    this.properties.coolingPriceComfort = coolingPriceComfort;
    this.properties.globalPriceComfort = globalPriceComfort;
    Energy.emitStaticDomainEvent(ENERGY_EVENTS.PRICES_COMFORT_ADDED, this);
  }

  updateTotalRewards(reward: number): void {
    this.properties.totalRewards = (this.properties.totalRewards ?? 0) + reward;
    Energy.emitStaticDomainEvent(ENERGY_EVENTS.TOTAL_REWARDS_UPDATED, this);
  }

  setCurrentQuiz(quiz: Quiz): void {
    this.properties.currentQuiz = quiz;
    this.properties.currentAnswerIsCorrect = undefined;
    Energy.emitStaticDomainEvent(ENERGY_EVENTS.CURRENT_QUIZ_SET, this);
  }

  checkAnswer(isCorrect: boolean): void {
    this.properties.currentAnswerIsCorrect = isCorrect;
    Energy.emitStaticDomainEvent(ENERGY_EVENTS.ANSWER_CHECKED, this);
  }

  computeRewards(): void {
    if (this.properties.currentAnswerIsCorrect) {
      this.properties.totalRewards =
        (this.properties.totalRewards ?? 0) + (this.properties.currentQuiz?.properties.reward ?? 0);
    }
    this.properties.currentQuiz = undefined;
    Energy.emitStaticDomainEvent(ENERGY_EVENTS.REWARDS_COMPUTED, this);
  }
}
