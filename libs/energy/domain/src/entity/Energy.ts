import { Entity } from '@clean-rn/ddd';
import { ENERGY_EVENTS } from '../events';
import { MeasurementVO, PriceConfortVO } from '../value-objects';
import { ISensor, MEASUREMENT_UNIT, SENSOR_TYPE } from '../types';

export interface IEnergyProperties {
  userId: string;
  sensors: ISensor[];
  measurements?: {
    [SENSOR_TYPE.TEMPERATURE]?: MeasurementVO;
    [SENSOR_TYPE.HUMIDITY]?: MeasurementVO;
    [SENSOR_TYPE.CO2]?: MeasurementVO;
  };
  priceConfort: PriceConfortVO;
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

  addConfortPrice(priceConfort: PriceConfortVO): void {
    this.properties.priceConfort = priceConfort;
    Energy.emitStaticDomainEvent(ENERGY_EVENTS.PRICECONFORT_ADDED, this);
  }
}
