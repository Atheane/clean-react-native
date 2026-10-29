import { IsBoolean, IsDateString, IsDefined, IsEnum, validate } from 'class-validator';
import { HEATER_TYPE, HEATER_USAGE } from '../enums';
import { CarbonError } from '../errors';

// pros: value objects check if properties are conform to domain values defined in back-end
// cons: value objects classes are coupled with class-validator library
export class HeaterVO {
  @IsDateString()
  @IsDefined()
  date!: string;

  @IsEnum(HEATER_TYPE)
  @IsDefined()
  heaterType!: HEATER_TYPE;

  @IsEnum(HEATER_USAGE)
  @IsDefined()
  heaterUsage!: HEATER_USAGE;

  @IsBoolean()
  @IsDefined()
  isActive!: boolean;

  private constructor(props: Partial<HeaterVO>) {
    Object.assign(this, props);
  }

  static async create(props: Partial<HeaterVO>): Promise<HeaterVO> {
    const heater = new HeaterVO(props);
    await heater.validate();
    return heater;
  }

  private async validate(): Promise<void> {
    const errors = await validate(this);

    if (errors.length > 0) {
      const heaterTypeErrors = errors.filter((error) => error.property === 'heaterType');
      if (errors.some((error) => error.property === 'heaterType')) {
        throw new CarbonError.InvalidHeaterType(heaterTypeErrors);
      }
      const dateErrors = errors.filter((error) => error.property === 'date');
      if (errors.some((error) => error.property === 'date')) {
        throw new CarbonError.InvalidHeaterDate(dateErrors);
      }

      const heaterUsageErrors = errors.filter((error) => error.property === 'heaterUsage');
      if (errors.some((error) => error.property === 'heaterUsage')) {
        throw new CarbonError.InvalidHeaterUsage(heaterUsageErrors);
      }
    }
  }

  get value() {
    return {
      date: this.date,
      heaterType: this.heaterType,
      heaterUsage: this.heaterUsage,
      isActive: this.isActive,
    };
  }
}
