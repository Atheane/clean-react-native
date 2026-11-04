import { Email } from '@clean-rn/auth/domain';
import {
  MEASUREMENT_UNIT,
  PRICE_COMFORT_DATA_GRANULARITY,
  PRICE_COMFORT_TYPE,
  SENSOR_TYPE,
} from '@clean-rn/energy/domain';
import { User } from '@clean-rn/user/domain';

export const mockUser = User.CreateFromEmail(new Email('fake@email.com'));
export const mockSensorsCO2 = [
  {
    type: SENSOR_TYPE.CO2,
    startDate: new Date(),
    roomId: 1,
  },
];
export const mockSensorsCO2AndHumidity = [
  {
    type: SENSOR_TYPE.CO2,
    startDate: new Date(),
    roomId: 1,
  },
  {
    type: SENSOR_TYPE.HUMIDITY,
    startDate: new Date(),
    roomId: 1,
  },
];

export const mockMeasurementCO2 = {
  observedAt: new Date(),
  unit: MEASUREMENT_UNIT.PPM,
  average: 100,
  data: [],
};

export const mockMeasurementHumidity = {
  observedAt: new Date(),
  unit: MEASUREMENT_UNIT.PERCENTAGE,
  average: 50,
  data: [],
};

export const mockMeasurementTemperature = {
  observedAt: new Date(),
  unit: MEASUREMENT_UNIT.CELCIUS,
  average: 20,
  data: [],
};

export const mockPricesComfort = [
  {
    type: PRICE_COMFORT_TYPE.ALL,
    granularity: PRICE_COMFORT_DATA_GRANULARITY.DAILY,
    endDate: '2025-03-07T00:00:00.000Z',
    value: {
      incremental: 1480.2069375871483,
      average: 17006.343627221664,
    },
    startDate: '2025-03-01T00:00:00.000Z',
    temperature: 18,
  },
  {
    type: PRICE_COMFORT_TYPE.HEATING,
    granularity: PRICE_COMFORT_DATA_GRANULARITY.DAILY,
    endDate: '2025-03-07T00:00:00.000Z',
    value: {
      incremental: 1480.2069375871483,
      average: 17006.343627221664,
    },
    startDate: '2025-03-01T00:00:00.000Z',
    temperature: 18,
  },
];
