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
  PPM = 'ppm',
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
