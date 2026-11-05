import { IsDateString, IsDefined, IsEnum, validate, IsNumber, IsArray, IsOptional } from 'class-validator';
import { MEASUREMENT_UNIT, IMeasurement } from '../types';
import { EnergyError } from '../errors';

export class MeasurementVO {
  @IsDateString()
  @IsDefined()
  observedAt!: Date;

  @IsEnum(MEASUREMENT_UNIT)
  @IsDefined()
  unit!: MEASUREMENT_UNIT;

  @IsNumber()
  @IsDefined()
  average!: number;

  @IsArray()
  @IsOptional()
  data?: IMeasurement[];

  private constructor(props: Partial<MeasurementVO>) {
    Object.assign(this, props);
  }

  static async create(props: Partial<MeasurementVO>): Promise<MeasurementVO> {
    const measurement = new MeasurementVO(props);
    await measurement.validate();
    return measurement;
  }

  private async validate(): Promise<void> {
    const errors = await validate(this);
    if (errors.length > 0) {
      throw new EnergyError.InvalidMeasurement(errors);
    }
  }

  get value() {
    return this.average.toFixed(0);
  }
}
