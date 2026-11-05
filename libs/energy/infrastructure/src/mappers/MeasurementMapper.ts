import { EnergyError, IMeasurement, MEASUREMENT_UNIT, MeasurementVO } from '@clean-rn/energy/domain';
import { IMeasurementsDto, IMeasurementDto, MEASUREMENT_UNIT_DTO } from '../dto';

const mapUnit = (unitCode: MEASUREMENT_UNIT_DTO): MEASUREMENT_UNIT | undefined => {
  switch (unitCode) {
    case MEASUREMENT_UNIT_DTO.PPM:
      return MEASUREMENT_UNIT.PPM;
    case MEASUREMENT_UNIT_DTO.P1:
      return MEASUREMENT_UNIT.PERCENTAGE;
    case MEASUREMENT_UNIT_DTO.CEL:
      return MEASUREMENT_UNIT.CELCIUS;
    default:
      return;
  }
};

const mapUnitDto = (unit: MEASUREMENT_UNIT): MEASUREMENT_UNIT_DTO | undefined => {
  switch (unit) {
    case MEASUREMENT_UNIT.PPM:
      return MEASUREMENT_UNIT_DTO.PPM;
    case MEASUREMENT_UNIT.PERCENTAGE:
      return MEASUREMENT_UNIT_DTO.P1;
    case MEASUREMENT_UNIT.CELCIUS:
      return MEASUREMENT_UNIT_DTO.CEL;
    default:
      return;
  }
};

export class MeasurementMapper {
  static async toDomain(dto: IMeasurementsDto): Promise<MeasurementVO> {
    const unit = mapUnit(dto.unitCode as MEASUREMENT_UNIT_DTO);
    const hasInvalidUnitCode = dto.data?.find(
      (measurement: IMeasurementDto) => !mapUnit(measurement.unitCode as MEASUREMENT_UNIT_DTO),
    );
    if (!unit || hasInvalidUnitCode) {
      // will happen if back-end send invalid unit code
      throw new EnergyError.InvalidUnitCode();
    }
    const measurementProps: Partial<MeasurementVO> = {
      observedAt: dto.observedAt,
      unit,
      average: dto.value,
      data: dto.data?.map((measurement: IMeasurementDto) => ({
        observedAt: measurement.observedAt,
        unit: mapUnit(measurement.unitCode as MEASUREMENT_UNIT_DTO),
        value: measurement.value,
      })) as IMeasurement[],
    };
    return MeasurementVO.create(measurementProps);
  }

  static toDto(measurement: MeasurementVO): IMeasurementsDto {
    return {
      observedAt: measurement.observedAt,
      unitCode: mapUnitDto(measurement.unit),
      value: measurement.average,
      data: measurement.data?.map((measurement: IMeasurement) => ({
        observedAt: measurement.observedAt,
        unitCode: mapUnitDto(measurement.unit),
        value: measurement.value,
      })) as IMeasurementDto[],
    };
  }
}
