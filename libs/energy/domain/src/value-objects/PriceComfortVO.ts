import { IsDateString, IsDefined, IsEnum, validate, IsNumber } from 'class-validator';
import { PRICE_COMFORT_DATA_GRANULARITY, PRICE_COMFORT_TYPE } from '../types';
import { EnergyError } from '../errors';

export class PriceComfortVO {
  @IsDefined()
  @IsEnum(PRICE_COMFORT_TYPE)
  readonly type!: PRICE_COMFORT_TYPE;

  @IsDefined()
  @IsEnum(PRICE_COMFORT_DATA_GRANULARITY)
  readonly granularity!: PRICE_COMFORT_DATA_GRANULARITY;

  @IsDefined()
  @IsNumber()
  readonly intercept!: number;

  @IsDefined()
  @IsNumber()
  readonly slope!: number;

  @IsDefined()
  @IsDateString()
  readonly startDate!: Date;

  @IsDefined()
  @IsDateString()
  readonly endDate!: Date;

  @IsDefined()
  @IsNumber()
  readonly temperature!: number;

  private constructor(props: Partial<PriceComfortVO>) {
    Object.assign(this, props);
  }

  static async create(props: Partial<PriceComfortVO>): Promise<PriceComfortVO> {
    const pc = new PriceComfortVO(props);
    await pc.validate();
    return pc;
  }

  private async validate(): Promise<void> {
    const errors = await validate(this);

    if (errors.length > 0) {
      throw new EnergyError.InvalidPriceComfort(errors);
    }
  }

  get value() {
    return {
      average: this.intercept.toFixed(0),
      incremental: this.slope.toFixed(0),
    };
  }
}
