export enum SENSOR_TYPE {
  TEMPERATURE = 'TEMPERATURE',
  HUMIDITY = 'HUMIDITY',
  CO2 = 'CO2',
}

export interface ISensor {
  type: SENSOR_TYPE;
  startDate: Date;
  roomId?: number;
}

export interface IMeasurement {
  observedAt: Date;
  unit: MEASUREMENT_UNIT;
  value: number;
}

export enum MEASUREMENT_UNIT {
  CELCIUS = 'CELCIUS',
  PERCENTAGE = 'PERCENTAGE',
  PPM = 'PPM',
}

export enum PRICE_COMFORT_TYPE {
  ALL = 'ALL',
  HEATING = 'HEATING',
  COOLING = 'COOLING',
}

export enum PRICE_COMFORT_DATA_GRANULARITY {
  DAILY = 'DAILY',
  INSTANT = 'INSTANT',
  MONTHLY = 'MONTHLY',
}
