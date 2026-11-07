export enum SENSOR_TYPE {
  TEMPERATURE = 'TEMPERATURE',
  HUMIDITY = 'HUMIDITY',
  CO2 = 'CO2',
  TEMPERATURE_EXT = 'TEMPERATURE_EXT',
  HUMIDITY_EXT = 'HUMIDITY_EXT',
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
  UNKNOWN = 'UNKNOWN',
}

export enum QUIZ_DIFFICULTY {
  EXTREME = 'EXTREME',
  NORMAL = 'NORMAL',
  EASY = 'EASY',
  HARD = 'HARD',
}

export enum QUIZ_THEME {
  ENERGY = 'ENERGY',
  ENVIRONMENT = 'ENVIRONMENT',
  HEALTH = 'HEALTH',
}

export interface IEnergyConsumption {
  value: number;
  month: string;
  year: number;
}

export enum IWorks {
  ISOLATION_ANTICS = 'ISOLATION_ANTICS',
  HEAT_PUMP = 'HEAT_PUMP',
  ISOLATION_WINDOWS = 'ISOLATION_WINDOWS',
  GLOBAL_RENOVATION = 'GLOBAL_RENOVATION',
}
