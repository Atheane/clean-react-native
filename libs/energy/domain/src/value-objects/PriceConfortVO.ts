import { IsDateString, IsDefined, IsEnum, validate, IsNumber } from 'class-validator';
import { PRICECONFORT_TYPE } from '../types';
import { EnergyError } from '../errors';

export class PriceConfortVO {
  @IsNumber()
  @IsDefined()
  average!: number; // intercept of linear regression

  @IsNumber()
  @IsDefined()
  incremental!: number; // slope of linear regression

  @IsEnum(PRICECONFORT_TYPE)
  @IsDefined()
  type!: PRICECONFORT_TYPE;

  @IsDateString()
  @IsDefined()
  startDate!: Date;

  @IsDateString()
  @IsDefined()
  endDate!: Date;

  private constructor(props: Partial<PriceConfortVO>) {
    Object.assign(this, props);
  }

  static async create(props: Partial<PriceConfortVO>): Promise<PriceConfortVO> {
    const pc = new PriceConfortVO(props);
    await pc.validate();
    return pc;
  }

  private async validate(): Promise<void> {
    const errors = await validate(this);

    if (errors.length > 0) {
      throw new EnergyError.InvalidMeasurement(errors);
    }
  }

  get value() {
    return {
      average: this.average,
      incremental: this.incremental,
    };
  }
}
