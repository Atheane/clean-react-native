import { IsBoolean, IsDateString, IsDefined, IsEnum, validate } from 'class-validator';
import { HEATER_TYPE, HEATER_USAGE } from '../enums';
import { IAddHeaterDto } from '../dtos';
import { CarbonError } from '../errors';

export class Heater {
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

  private constructor(dto: Partial<Heater>) {
    Object.assign(this, dto);
  }

  static async create(dto: Partial<Heater>): Promise<Heater> {
    const heater = new Heater(dto);
    await heater.validate();
    return heater;
  }

  private async validate(): Promise<void> {
    const errors = await validate(this);
    console.log('VALIDATION_ERRORS', errors);

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

  get value(): IAddHeaterDto {
    return {
      date: this.date,
      heaterType: this.heaterType,
      heaterUsage: this.heaterUsage,
      isActive: this.isActive,
    };
  }
}
