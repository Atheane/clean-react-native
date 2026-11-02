import { Work, WorkVO } from '@clean-rn/footprint/domain';
import { IWorkDto, IAddWorkDto } from '../dtos';

export class WorkMapper {
  static async toDomain({ workId, ...workProps }: IWorkDto): Promise<Work> {
    const workVO = await WorkVO.create({
      ...workProps,
    });
    return Work.Create({
      workId: workId.toString(),
      work: workVO,
    });
  }

  static toDto(workVO: WorkVO): IAddWorkDto {
    return {
      ...workVO.value,
    };
  }
}
