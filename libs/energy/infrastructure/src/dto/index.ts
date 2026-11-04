export enum SENSOR_TYPE_DTO {
  CO2 = 'co2', // Carbon Dioxide detected
  ENERGY_IMPORT = 'totalActiveEnergyImport', // totalActiveEnergyImport
  HUMIDITY = 'relativeHumidity', // Relative Humidity of the air (a number between 0 and 1 representing the range of 0% to 100%)
  HUMIDITY_EXT = 'wser-relativeHumidity', // External Relative Humidity of the air (a number between 0 and 1 representing the range of 0% to 100%)
  PARTICULE = 'pm25', // Particulate matter 2.5 micrometers or less in diameter
  POWER_IMPORT = 'totalActivePowerImport', // totalActivePowerImport
  TEMPERATURE = 'temperature', // Temperature of the item
  TEMPERATURE_EXT = 'wser-temperature', // Temperature outside of the house
  WIND_SPEED = 'wser-windSpeed', // Wind speed outside of the house
}

export type ISensorDto = {
  measurment: SENSOR_TYPE_DTO;
  roomNumber?: number;
  startDate: Date;
};

export enum MEASUREMENT_UNIT_DTO {
  PPM = '59',
  P1 = 'P1',
  CEL = 'CEL',
}

export type IMeasurementDto = {
  observedAt: Date;
  unitCode?: MEASUREMENT_UNIT_DTO;
  value: number;
};

export type IMeasurementsDto = {
  observedAt: Date;
  unitCode?: MEASUREMENT_UNIT_DTO;
  value: number;
  data: IMeasurementDto[];
};

export enum PRICE_COMFORT_TYPE_DTO {
  ALL = 'COMFORT_PRICE', // computation made using all Degree Days
  COOLING = 'COMFORT_PRICE_COOLING', // computation made using Cooling Degree Days
  HEATING = 'COMFORT_PRICE_HEATING', // computation made using Heating Degree Days
}

export enum PRICE_COMFORT_DATA_GRANULARITY_DTO {
  DAILY = 'DAILY', // computation made using daily data
  INSTANT = 'INSTANT', // computation made using single data (available only with heating/cooling consumption)
  MONTHLY = 'MONTHLY', // computation made using monthly data
}

export type IPriceComfortDto = {
  comfortPriceType: PRICE_COMFORT_TYPE_DTO;
  dataCount: number;
  dataGranularity: PRICE_COMFORT_DATA_GRANULARITY_DTO;
  intercept: number;
  endDate: Date;
  value: number;
  startDate: Date;
  temperature: number;
};

export type IRewardsStatsDto = {
  count: number;
  rewardChallenge: number;
  rewardPending: number;
  rewardQuiz: number;
  rewardTotal: number;
  updatedAt: Date;
};
