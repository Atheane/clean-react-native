import { Max, Min, IsInt, IsDefined, validate } from 'class-validator';
import { FootprintError } from '../errors';

// pros: value objects check if properties are conform to domain values defined in back-end
// cons: value objects classes are coupled with class-validator library
export class FootprintVO {
  @Max(20)
  @Min(1)
  @IsInt()
  @IsDefined()
  adultNumber!: number;

  @Max(20)
  @Min(0)
  @IsInt()
  @IsDefined()
  childNumber!: number;

  private constructor(props: Partial<FootprintVO>) {
    Object.assign(this, props);
  }

  static async create(props: Partial<FootprintVO>): Promise<FootprintVO> {
    const footprint = new FootprintVO(props);
    await footprint.validate();
    return footprint;
  }

  private async validate(): Promise<void> {
    const errors = await validate(this);
    if (errors.length > 0) {
      const adultNumberErrors = errors.filter((error) => error.property === 'adultNumber');
      if (errors.some((error) => error.property === 'adultNumber')) {
        throw new FootprintError.InvalidAdultNumber(adultNumberErrors);
      }
      const childNumberErrors = errors.filter((error) => error.property === 'childNumber');
      if (errors.some((error) => error.property === 'childNumber')) {
        throw new FootprintError.InvalidChildNumber(childNumberErrors);
      }
    }
  }

  get value() {
    return {
      adultNumber: this.adultNumber,
      childNumber: this.childNumber,
    };
  }
}
