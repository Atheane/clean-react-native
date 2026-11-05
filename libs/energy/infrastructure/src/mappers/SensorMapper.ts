import { EnergyError, ISensor, SENSOR_TYPE } from '@clean-rn/energy/domain';
import { ISensorDto, SENSOR_TYPE_DTO } from '../dto';

export class SensorMapper {
  static async toDomain(dto: ISensorDto): Promise<ISensor | undefined> {
    let sensorType: SENSOR_TYPE | undefined;
    if (dto.measurment === SENSOR_TYPE_DTO.CO2) {
      sensorType = SENSOR_TYPE.CO2;
    } else if (dto.measurment === SENSOR_TYPE_DTO.HUMIDITY) {
      sensorType = SENSOR_TYPE.HUMIDITY;
    } else if (dto.measurment === SENSOR_TYPE_DTO.TEMPERATURE) {
      sensorType = SENSOR_TYPE.TEMPERATURE;
    } else if (dto.measurment === SENSOR_TYPE_DTO.TEMPERATURE_EXT) {
      sensorType = SENSOR_TYPE.TEMPERATURE_EXT;
    } else if (dto.measurment === SENSOR_TYPE_DTO.HUMIDITY_EXT) {
      sensorType = SENSOR_TYPE.HUMIDITY_EXT;
    }
    if (!sensorType) {
      throw new EnergyError.InvalidSensorType(); // will happen
    }
    return {
      type: sensorType,
      startDate: dto.startDate,
      roomId: dto.roomNumber,
    };
  }

  static toDto(sensor: ISensor): ISensorDto {
    let sensorType: SENSOR_TYPE_DTO | undefined;
    if (sensor.type === SENSOR_TYPE.CO2) {
      sensorType = SENSOR_TYPE_DTO.CO2;
    } else if (sensor.type === SENSOR_TYPE.HUMIDITY) {
      sensorType = SENSOR_TYPE_DTO.HUMIDITY;
    } else if (sensor.type === SENSOR_TYPE.TEMPERATURE) {
      sensorType = SENSOR_TYPE_DTO.TEMPERATURE;
    } else if (sensor.type === SENSOR_TYPE.TEMPERATURE_EXT) {
      sensorType = SENSOR_TYPE_DTO.TEMPERATURE_EXT;
    } else if (sensor.type === SENSOR_TYPE.HUMIDITY_EXT) {
      sensorType = SENSOR_TYPE_DTO.HUMIDITY_EXT;
    }
    return {
      measurment: sensorType as SENSOR_TYPE_DTO, // never undefined if from domain
      startDate: sensor.startDate,
      roomNumber: sensor.roomId,
    };
  }
}
