import { IsDateString, IsDefined, IsEnum, validate } from 'class-validator';
import { HOUSE_WORK_TYPE } from '../enums';
import { FootprintError } from '../errors';

// pros: value objects check if properties are conform to domain values defined in back-end
// cons: value objects classes are coupled with class-validator library
export class WorkVO {
  @IsDateString()
  @IsDefined()
  workDate!: string;

  @IsEnum(HOUSE_WORK_TYPE)
  @IsDefined()
  workType!: HOUSE_WORK_TYPE;

  private constructor(props: Partial<WorkVO>) {
    Object.assign(this, props);
  }

  static async create(props: Partial<WorkVO>): Promise<WorkVO> {
    const work = new WorkVO(props);
    await work.validate();
    return work;
  }

  private async validate(): Promise<void> {
    const errors = await validate(this);

    if (errors.length > 0) {
      const workDateErrors = errors.filter((error) => error.property === 'workDate');
      if (errors.some((error) => error.property === 'workDate')) {
        throw new FootprintError.InvalidWorkDate(workDateErrors);
      }

      const workTypeErrors = errors.filter((error) => error.property === 'workType');
      if (errors.some((error) => error.property === 'workType')) {
        throw new FootprintError.InvalidWorkType(workTypeErrors);
      }
    }
  }

  get value() {
    return {
      workDate: this.workDate,
      workType: this.workType,
    };
  }
}
