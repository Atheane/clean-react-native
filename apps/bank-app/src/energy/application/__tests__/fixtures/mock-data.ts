import { Email } from '@clean-rn/auth/domain';
import { MEASUREMENT_UNIT, SENSOR_TYPE } from '@clean-rn/energy/domain';
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
