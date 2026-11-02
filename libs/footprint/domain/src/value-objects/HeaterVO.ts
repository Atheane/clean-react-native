import { IsBoolean, IsDateString, IsDefined, IsEnum, validate } from 'class-validator';
import { HEATER_TYPE, HEATER_USAGE } from '../enums';
import { FootprintError } from '../errors';

// pros: value objects check if properties are conform to domain values defined in back-end
// cons: value objects classes are coupled with class-validator library
export class HeaterVO {
  @IsDateString()
  @IsDefined()
  installationDate!: string;

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
      const heaterUsageErrors = errors.filter((error) => error.property === 'heaterUsage');
      if (errors.some((error) => error.property === 'heaterUsage')) {
        throw new FootprintError.InvalidHeaterUsage(heaterUsageErrors);
      }

      const heaterTypeErrors = errors.filter((error) => error.property === 'heaterType');
      if (errors.some((error) => error.property === 'heaterType')) {
        throw new FootprintError.InvalidHeaterType(heaterTypeErrors);
      }
      const dateErrors = errors.filter((error) => error.property === 'installationDate');
      if (errors.some((error) => error.property === 'installationDate')) {
        throw new FootprintError.InvalidHeaterDate(dateErrors);
      }
    }
  }

  get value() {
    return {
      installationDate: this.installationDate,
      heaterType: this.heaterType,
      heaterUsage: this.heaterUsage,
      isActive: this.isActive,
    };
  }
}
